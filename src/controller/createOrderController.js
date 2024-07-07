// import createOrderApiService from '../service/createOrderApiService';

// import momoService from '../service/MomoApiService';



// const createFuncOrderDetail = async (req, res) => {
//     try {
//         let data = await createOrderApiService.createOrderDetail({
//             id_order,
//             nameProduct,
//             district,
//             price,
//             price,
//             quantity,
//         });
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



// // app.post('/callback', async (req, res) => {
// //     try {
// //         console.log("Received callback request:", req.body); // Logging the request body

// //         // Call the corresponding controller function to handle MoMo payment logic
// //         let dataCallback = await createOrderController.createMoMoPayment(req, res);
// //         res.send("send data callback to createOrderController", dataCallback)

// //         console.log(dataCallback)

// //     } catch (error) {
// //         console.error("Error in POST /callback:", error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, paymentMethod, username, email, phone, district, resultCode } = req.body;

//         // Ensure items are provided and calculate the total
//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

//         const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//         // Validate total
//         if (isNaN(total)) {
//             return res.status(400).json({ error: 'Invalid total amount' });
//         }

//         // Determine status based on resultCode
//         let status = resultCode === 0 ? 'Đã thanh toán' : 'Chưa thanh toán';

//         // Call createPayment from momoService passing all required parameters
//         const { payUrl } = await momoService.createPayment({ items, total, paymentMethod, username, email, phone, district });
//         console.log('Resolved Payment Object:', { payUrl });

//         // Create order in the database
//         const createOrderResult = await createOrderApiService.createOrder({
//             total,
//             paymentMethod,
//             username,
//             email,
//             phone,
//             district,
//             status,
//             orderId: req.body.orderId, // Assuming orderId is included in req.body
//         });

//         console.log('Create Order Result:', createOrderResult);

//         // Respond with payment URL
//         res.status(200).json({ paymentUrl: payUrl });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export default {
//     // createFuncOrder,
//     createMoMoPayment, createFuncOrderDetail
// };
