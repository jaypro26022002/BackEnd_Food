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
    await queryInterface.bulkInsert('User',
      [
        {
          email: 'John Doe',
          password: '123',
          username: 'fake11',
          groupId: '2'
        },
        {
          email: 'John Doe2',
          password: '123',
          username: 'fake12',
          groupId: '2'
        },
        {
          email: 'John Doe3',
          password: '123',
          username: 'fake13',
          groupId: '2'
        },
        {
          email: 'John Doe4',
          password: '123',
          username: 'fake14',
          groupId: '2'
        },
        {
          email: 'John Doe4',
          password: '123',
          username: 'fake14',
          groupId: '2'
        },
        {
          email: 'John Doe5',
          password: '123',
          username: 'fake15',
          groupId: '2'
        }
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
