import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = require('../config').secret;

import { getUser } from '../services/user';


const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

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
      email: user.email
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
export const verifyTokenAndReturnDecoded = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });
};

export const verifyToken = async (request, response, next) => {
  request.decoded = {};

  const token = getTokenFromHeader(request);
  try {
    if (token) {
      const decoded = await verifyTokenAndReturnDecoded(token);
      const user = await getUser({ email: decoded.email });
      request.decoded = user;
      next();
    } else {
      return response.status(401).json({
        error: 'Token required for access',
      });
    }
  } catch (error) {
    return response.status(403).json({ error: 'Invalid or no Token was provided. Please login to continue' });
  }
};
