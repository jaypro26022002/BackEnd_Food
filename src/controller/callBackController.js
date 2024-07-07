

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

// export default {
//     handleMoMoCallback
// };
