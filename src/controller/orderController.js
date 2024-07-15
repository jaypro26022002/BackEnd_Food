import ordersService from '../service/orderApiService';
import momoService from '../service/MomoApiService';

const createFuncOrder = async (req, res) => {
    try {
        const { items, total, paymentMethod, username, email, phone, district } = req.body;
        let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district });
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("Error in createFuncOrder:", e.message);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        });
    }
};

// orderController.js

const createMoMoPayment = async (req, res) => {
    try {
        const { items, paymentMethod, username, email, phone, district } = req.body;

        console.log(" items ", items)
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        // if(!pricedown)
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (isNaN(total)) {
            return res.status(400).json({ error: 'Invalid total amount' });
        }

        const { payUrl, orderId } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });

        let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district, orderId, status: 'Pending Payment' });
        res.status(200).json({ paymentUrl: payUrl, orderId, items }); // Include items in the response
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// import ordersService from '../service/orderApiService';
// import momoService from '../service/MomoApiService';

// const createFuncOrder = async (req, res) => {
//     try {
//         const { items, total, paymentMethod, username, email, phone, district } = req.body;
//         let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district });
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (e) {
//         console.error("Error in createFuncOrder:", e.message);
//         return res.status(500).json({
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         });
//     }
// };

// // orderController.js

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, paymentMethod, username, email, phone, district } = req.body;

//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

//         const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//         if (isNaN(total)) {
//             return res.status(400).json({ error: 'Invalid total amount' });
//         }

//         const { payUrl, orderId } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });

//         let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district, orderId, status: 'Pending Payment' });
//         res.status(200).json({ paymentUrl: payUrl, orderId, items }); // Include items in the response
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, paymentMethod, username, email, phone, district } = req.body;

//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

//         const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//         if (isNaN(total)) {
//             return res.status(400).json({ error: 'Invalid total amount' });
//         }

//         const { payUrl, orderId } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });

//         let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district, orderId, status: 'Pending Payment' });
//         res.status(200).json({ paymentUrl: payUrl });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// const createFuncOrder = async (req, res) => {
//     try {
//         const { items, total, paymentMethod, username, email, phone, district } = req.body;
//         let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district });
//         console.log("phone", data)
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (e) {
//         console.error("Error in createFuncOrder:", e.message);
//         return res.status(500).json({
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         });
//     }
// };

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, paymentMethod, username, email, phone, district } = req.body;

//         // Ensure items are provided and calculate the total
//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

//         const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//         // Validate total
//         if (isNaN(total)) {
//             return res.status(400).json({ error: 'Invalid total amount' });
//         }

//         // Call createPayment from momoService passing all required parameters
//         const { payUrl, orderId } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });
//         console.log('Resolved Payment Object:', { payUrl, orderId });

//         // Update createOrder to pass orderId to createOrder service
//         let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district, orderId });
//         // console.log("phone", data)
//         res.status(200).json({ paymentUrl: payUrl });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
export default {
    createFuncOrder,
    createMoMoPayment,
}

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, paymentMethod, username, email, phone, district } = req.body;

//         // Ensure items are provided and calculate the total
//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

//         const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//         // Validate total
//         if (isNaN(total)) {
//             return res.status(400).json({ error: 'Invalid total amount' });
//         }

//         // Call createPayment from momoService passing all required parameters
//         const { payUrl } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });
//         console.log('Resolved Payment Object:', { payUrl });

//         res.status(200).json({ paymentUrl: payUrl });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };



// const createFuncUpdateOrder = async (req, res) => {
//     try {
//         // Assuming req.body contains necessary information like id_product, status, orderId, etc.
//         let data = await ordersService.updateOrder(req.body);
//         console.log("Updating order with callback data:", req);

//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (e) {
//         console.error("Error in createFuncUpdateOrder:", e.message);
//         return res.status(500).json({
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         });
//     }
// };


// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, paymentMethod, username, email, phone, district } = req.body;

//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

//         const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         if (isNaN(total)) {
//             return res.status(400).json({ error: 'Invalid total amount' });
//         }

//         // Call MoMo service to create payment
//         const { payUrl, resultCode, localMessage } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });
//         console.log('Resolved Payment Object:', { payUrl, resultCode, localMessage });

//         // Determine status based on resultCode
//         let status = resultCode === 0 ? 'Đã thanh toán' : 'Chưa thanh toán';
//         console.log('Updating order status to:', status);

//         // Update order status
//         const updateStatusResult = await ordersService.updateOrderStatus(username, status);

//         if (updateStatusResult.EC !== 0) {
//             console.error('Failed to update order status:', updateStatusResult.EM);
//             return res.status(500).json({ error: 'Failed to update order status' });
//         }

//         // Send the response with payment URL
//         res.status(200).json({ paymentUrl: payUrl });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };




// import ordersService from '../service/orderApiService';
// import momoService from '../service/MomoApiService';



// const createFuncOrder = async (req, res) => {
//     try {
//         const { items, total, paymentMethod, username, email, phone, district } = req.body;
//         let data = await ordersService.createOrder({ items, total, paymentMethod, username, email, phone, district });
//         // console.log("phone", data)
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (e) {
//         console.error("Error in createFuncOrder:", e.message);
//         return res.status(500).json({
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         });
//     }
// };

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, paymentMethod, username, email, phone, district } = req.body;

//         // Ensure items are provided and calculate the total
//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

//         const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//         // Validate total
//         if (isNaN(total)) {
//             return res.status(400).json({ error: 'Invalid total amount' });
//         }

//         // Call createPayment from momoService passing all required parameters
//         const { payUrl } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });
//         console.log('Resolved Payment Object:', { payUrl });

//         res.status(200).json({ paymentUrl: payUrl });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export default {
//     createFuncOrder,
//     createMoMoPayment,
// };

// import crypto from 'crypto';
// import db from "../models";
// // Secret Key for Signature Verification
// const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

// const verifyMoMoSignature = (data, signature) => {
//     const rawSignature = `amount=${data.amount}&extraData=${data.extraData}&message=${data.message}&orderId=${data.orderId}&orderInfo=${data.orderInfo}&orderType=${data.orderType}&partnerCode=${data.partnerCode}&payType=${data.payType}&requestId=${data.requestId}&responseTime=${data.responseTime}&resultCode=${data.resultCode}&transId=${data.transId}`;
//     const expectedSignature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
//     return expectedSignature === signature;
// };

// const handleMoMoCallback = async (req, res) => {
//     try {
//         const callbackData = req.body;
//         const { orderId, resultCode, message, signature } = callbackData;

//         if (!verifyMoMoSignature(callbackData, signature)) {
//             return res.status(400).json({ error: 'Invalid signature' });
//         }

//         if (resultCode !== 0) {
//             console.error('Payment failed:', message);
//             return res.status(400).json({ error: 'Payment failed', message });
//         }

//         const transaction = await db.sequelize.transaction();
//         try {
//             const order = await db.Order.findOne({ where: { orderId } });

//             if (!order) {
//                 throw new Error('Order not found');
//             }

//             order.status = 'Paid';
//             await order.save({ transaction });

//             await transaction.commit();

//             res.status(200).json({ message: 'Payment successful and order updated' });
//         } catch (error) {
//             await transaction.rollback();
//             console.error('Error updating order:', error);
//             res.status(500).json({ error: 'Error updating order' });
//         }
//     } catch (error) {
//         console.error('Error in MoMo callback:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// const getOrder = async (orderId) => {
//     try {
//         const order = await db.Order.findOne({
//             where: { id_order: orderId },
//             include: [db.OrderDetail] // Adjust according to your database models
//         });
//         return order;
//     } catch (error) {
//         console.error('Error retrieving order:', error);
//         throw new Error('Error retrieving order');
//     }
// };

// export default {
//     createFuncOrder,
//     createMoMoPayment,
// handleMoMoCallback,
// getOrder
// };
