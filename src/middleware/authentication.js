const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const User = require('../models').User;
const bcrypt = require('bcryptjs');

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

  // const hashPassword = (password, saltRounds) => bcrypt.hash(password, saltRounds)
  // .then(hash => hash)
  // .catch(error => error);
export const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            resolve(hash);
        });
    });
  });
}

export const validPassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
  /**
  * @description - Generates token for user authentication
  * @param {object} user - object containing user details
  * @returns {object} token - jwt token
  */
export const generateToken = (user, expiresIn) => {
  if (expiresIn) {
    return jwt.sign({
      email: user.id
    }, secret, { expiresIn });
  }
  return jwt.sign({
    email: user.email
  }, secret);
};
  /**
  *
  * @desciption - Verifies token
  */
export const verifyToken = (request, response, next) => {
  const token = request.headers.authorization ||
  request.headers['x-access-token'];
  request.decoded = {};
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return response.status(401).json({
          message: 'Session expired. Please login to continue',
        });
      }
      User.findById(decoded.userId).then((user) => {
        if (!user) { return response.sendStatus(401).send({message: 'Unauthorized'}); }
        request.decoded = decoded;
        next();
      });
    });
  } else {
    return response.status(401).json({
      message: 'Token required for access',
    });
  }
};
