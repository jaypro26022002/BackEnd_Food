import db from "../models";

const createOrder = async (data) => {
    try {
        await db.Order.create({
            total: data.total,
            paymentMethod: data.paymentMethod,  // Ensure to use `image` from the request
            username: data.username,
            email: data.email,
            phone: data.phone,
            status: data.status,
            orderId: data.orderId,
        });
        return {
            EM: 'Create order ok',
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return {
            EM: 'Error from server',
            EC: -1,
            DT: []
        };
    }

};

const createOrderDetail = async (data) => {
    try {
        await db.OrderDetail.create({
            id_order: data.id_order,
            nameProduct: data.nameProduct,  // Ensure to use `image` from the request
            id_ship: data.id_ship,
            district: data.district,
            price: data.price,
            quantity: data.quantity,
        });
        return {
            EM: 'Create order detail ok',
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return {
            EM: 'Error from server',
            EC: -1,
            DT: []
        };
    }

};
module.exports = {
    createOrder, createOrderDetail
};

// const updateOrderStatus = async (username, status) => {
//     try {
//         const order = await db.Order.findOne({ where: { username } });
//         if (!order) {
//             throw new Error('Order not found');
//         }
//         order.status = status;
//         await order.save();
//         return {
//             EM: 'Order status updated successfully',
//             EC: 0,
//             DT: order,
//         };
//     } catch (error) {
//         console.error('Error updating order status:', error.message);
//         return {
//             EM: 'Error updating order status',
//             EC: -1,
//             DT: '',
//         };
//     }
// };


// module.exports = {
//     createOrder, updateOrderStatus
// };


// import db from "../models";

// const createOrder = async ({ items, total, paymentMethod, username, email, phone, district }) => {
//     const transaction = await db.sequelize.transaction();

//     try {
//         console.log('Starting order creation...');

//         const order = await db.Order.create(
//             {
//                 total: parseFloat(total), // Ensure that total is a float
//                 paymentMethod,
//                 username,
//                 email,
//                 phone // Ensure phone is passed correctly
//             },
//             { transaction }
//         );

//         if (!order || !order.id_order) {
//             throw new Error('Order creation failed');
//         }

//         console.log('Order created with ID:', order.id_order);

//         for (const item of items) {
//             await db.OrderDetail.create(
//                 {
//                     id_order: order.id_order,
//                     id_product: item.id_product,
//                     quantity: item.quantity,
//                     price: item.price,
//                     district
//                 },
//                 { transaction }
//             );
//         }

//         await transaction.commit();

//         console.log('Order and order details successfully created');

//         return {
//             EM: 'Order created successfully',
//             EC: 0,
//             DT: order,
//         };
//     } catch (e) {
//         await transaction.rollback();
//         console.error("Error in createOrder:", e.message);
//         return {
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         };
//     }
// };
// module.exports = {
//     createOrder
// };




// import db from "../models";

// const createOrder = async ({ items, total, paymentMethod }) => {
//     try {
//         const order = await db.Order.create({
//             total,
//             paymentMethod,
//         });

//         for (const item of items) {
//             await db.OrderDetail.create({
//                 id_order: order.id_order,
//                 id_product: item.id_product,
//                 quantity: item.quantity,
//                 price: item.price,
//             });
//         }

//         return {
//             EM: 'Order created successfully',
//             EC: 0,
//             DT: order,
//         };
//     } catch (e) {
//         console.error("Error in createOrder:", e);
//         return {
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         };
//     }
// };

// module.exports = {
//     createOrder
// }
