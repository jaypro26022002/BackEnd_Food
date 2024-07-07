'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Order',
      [
        {
          total: 'John Doe',
          paymentMethod: '123',
          username: 'fake11',
          email: 'fake201@gmail.com',
          phone: '123',
          status: 'Đã thanh toán',
          orderId: 'MOMO1720300906094'
        },
        {
          total: 'John Doe',
          paymentMethod: '123',
          username: 'fake11',
          email: 'fake201@gmail.com',
          phone: '123',
          status: 'Đã thanh toán',
          orderId: 'MOMO1720300906094'
        },
        {
          total: 'John Doe',
          paymentMethod: '123',
          username: 'fake11',
          email: 'fake201@gmail.com',
          phone: '123',
          status: 'Đã thanh toán',
          orderId: 'MOMO1720300906094'
        },
        {
          total: 'John Doe',
          paymentMethod: '123',
          username: 'fake11',
          email: 'fake201@gmail.com',
          phone: '123',
          status: 'Chưa thanh toán',
          orderId: 'MOMO1720300906094'
        },
        {
          total: 'John Doe5',
          paymentMethod: '123',
          username: 'fake12',
          email: 'fake201@gmail.com',
          phone: '123',
          status: 'Chưa thanh toán',
          orderId: 'MOMO1720300906094'
        },
        {
          total: 'John Doe7',
          paymentMethod: '123',
          username: 'fake16',
          email: 'fake201@gmail.com',
          phone: '123',
          status: 'Chưa thanh toán',
          orderId: 'MOMO1720300906094'
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
