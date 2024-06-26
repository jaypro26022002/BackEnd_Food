import db from "../models";

const createOrder = async ({ items, total, paymentMethod }) => {
    try {
        const order = await db.Order.create({
            total,
            paymentMethod,
        });

        for (const item of items) {
            await db.OrderItem.create({
                orderId: order.id,
                productId: item.id_product,
                quantity: item.qty,
                price: item.price,
            });
        }

        return {
            EM: 'Order created successfully',
            EC: 0,
            DT: order,
        };
    } catch (e) {
        console.error("Error in createOrder:", e);
        return {
            EM: 'Error from server',
            EC: -1,
            DT: '',
        };
    }
};

module.exports = {
    createOrder
}