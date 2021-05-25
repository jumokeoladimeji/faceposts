'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    image_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
    message: DataTypes.STRING,
    friends_tagged: DataTypes.ARRAY(DataTypes.INTEGER),
    check_in: DataTypes.STRING,
    feeling: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Post.hasMany(models.Reply, {
        foreignKey: 'postId',
        as: 'replies'
    })
    Post.hasMany(models.Like, {
        foreignKey: 'postId',
        as: 'likes'
    })
  }
  return Post;
};
