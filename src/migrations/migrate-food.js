'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameFood: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      collection: {
        type: Sequelize.STRING
      },
      pricedown: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      dishesId: {
        type: Sequelize.INTEGER
      },
      foodtypeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Food');
  }
};