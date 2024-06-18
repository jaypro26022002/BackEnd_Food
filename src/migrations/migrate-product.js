'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
      id_product: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameProduct: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      pricedown: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      collection: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      fastDelivery: {
        type: Sequelize.BOOLEAN
      },
      ratings: {
        type: Sequelize.INTEGER
      },
      id_type_product: {
        type: Sequelize.INTEGER
      },
      id_shop: {
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
    await queryInterface.dropTable('Product');
  }
};