// 'use strict';

// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         // Thêm cột id_user
//         await queryInterface.addColumn('Contact', 'id_contact', {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true
//         });

//         // Đặt id_user làm khóa chính
//         await queryInterface.addConstraint('Contact', {
//             fields: ['id_user'],
//             type: 'primary key',
//             name: 'pk_users_id_user'
//         });
//     },

//     down: async (queryInterface, Sequelize) => {
//         // Bỏ constraint khóa chính
//         // await queryInterface.removeConstraint('users', 'pk_users_id_user');

//         // Bỏ cột id_user
//         // await queryInterface.removeColumn('Contact', 'id_contact');
//     }
// };


// // Module.exports = {
// //     up: (queryInterface, Sequelize) => {
// //         return Promise.all([
// //             queryInterface.changeColumn('Contact', 'thumbnail', {
// //                 type: Sequelize.BLOB('long'),
// //                 allowNull: true,
// //             })
// //         ])
// //     },

// //     down: (queryInterface, Sequelize) => {
// //         return Promise.all([
// //             queryInterface.changeColumn('Food', 'thumbnail', {
// //                 type: Sequelize.STRING,
// //                 allowNull: true,
// //             })
// //         ])
// //     }
// // };