'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order', {
      id_order: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.DECIMAL(10, 3) // Đảm bảo hỗ trợ số thập phân
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending Payment'
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
    await queryInterface.dropTable('Order');
  }
};