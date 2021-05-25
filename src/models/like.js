'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Like.init({
    content: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Like',
  });
  Like.associate = (models) => {
    Like.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE'
    })
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }
  return Like;
};