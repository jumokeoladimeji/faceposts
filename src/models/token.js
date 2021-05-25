'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Token.init({
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};