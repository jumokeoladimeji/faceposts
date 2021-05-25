'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image_url: {
        allowNull: true,
        type: Sequelize.STRING
      },
      video_url: {
        allowNull: true,
        type: Sequelize.STRING
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      friends_tagged: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      check_in: {
        allowNull: true,
        type: Sequelize.STRING
      },
      feeling: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};
