const { Token } = require('../models');

export const verifyEmailToken = async (condition) => {
    const token = await Token.findOne({ where: condition })
    return token ? token.toJSON(): token;
};

export const saveToken = async (tokenDetails) => {
  const newToken = await Token.create(tokenDetails);
  return newToken.toJSON();
}

export const updateToken = (token, condition) => {
    return Token.update(token, {
        where: condition
    });
}
