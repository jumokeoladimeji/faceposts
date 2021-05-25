'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, default: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts'
    })
    User.hasMany(models.Reply, {
      foreignKey: 'userId',
      as: 'replies'
    })
    User.hasMany(models.Like, {
      foreignKey: 'userId',
      as: 'likes'
    })
  }
  return User;
};