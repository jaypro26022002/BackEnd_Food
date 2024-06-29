import db from "../models";

const createOrder = async ({ items, total, paymentMethod, username, email, phone, district }) => {
    const transaction = await db.sequelize.transaction();

    try {
        console.log('Starting order creation...');

        const order = await db.Order.create(
            {
                total: parseFloat(total), // Ensure that total is a float
                paymentMethod,
                username,
                email,
                phone // Ensure phone is passed correctly
            },
            { transaction }
        );

        if (!order || !order.id_order) {
            throw new Error('Order creation failed');
        }

        console.log('Order created with ID:', order.id_order);

        for (const item of items) {
            await db.OrderDetail.create(
                {
                    id_order: order.id_order,
                    id_product: item.id_product,
                    quantity: item.quantity,
                    price: item.price,
                    district
                },
                { transaction }
            );
        }

        await transaction.commit();

        console.log('Order and order details successfully created');

        return {
            EM: 'Order created successfully',
            EC: 0,
            DT: order,
        };
    } catch (e) {
        await transaction.rollback();
        console.error("Error in createOrder:", e.message);
        return {
            EM: 'Error from server',
            EC: -1,
            DT: '',
        };
    }
};




module.exports = {
    createOrder
};




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
