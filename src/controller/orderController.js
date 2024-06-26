import ordersService from '../service/orderApiService';
import momoService from '../service/momoApiService';

const createFuncOrder = async (req, res) => {
    try {
        const { items, total, paymentMethod } = req.body;
        let data = await ordersService.createOrder({ items, total, paymentMethod });
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

const createMoMoPayment = async (req, res) => {
    try {
        const { items, paymentMethod } = req.body;
        // Ensure items are provided and calculate the total
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        console.log("check totall", total)
        if (isNaN(total)) {
            return res.status(400).json({ error: 'Invalid total amount' });
        }

        const { payUrl } = await momoService.createPayment({ items, total, paymentMethod });
        console.log('Resolved Payment Object:', { payUrl });

        res.status(200).json({ paymentUrl: payUrl });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    createFuncOrder,
    createMoMoPayment
};

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, total, paymentMethod } = req.body;
//         const response = await momoService.createPayment({ items, total, paymentMethod });
//         return res.status(200).json(response);
//     } catch (e) {
//         console.error("Error in createMoMoPayment:", e.message);
//         return res.status(500).json({
//             EM: e.message,
//             EC: -1,
//             DT: '',
//         });
//     }
// };

// import ordersService from '../service/orderApiService';
// import momoService from '../service/momoApiService';

// const createFuncOrder = async (req, res) => {
//     try {
//         const { items, total, paymentMethod } = req.body;
//         let data = await ordersService.createOrder({ items, total, paymentMethod });
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (e) {
//         console.error("Error in createFuncOrder:", e);
//         return res.status(500).json({
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         });
//     }
// };

// const createMoMoPayment = async (req, res) => {
//     try {
//         const { items, total, paymentMethod } = req.body;
//         const response = await momoService.createPayment({ items, total, paymentMethod });
//         return res.status(200).json(response);
//     } catch (e) {
//         console.error("Error in createMoMoPayment:", e);
//         return res.status(500).json({
//             EM: 'Error from server',
//             EC: -1,
//             DT: '',
//         });
//     }
// };


// export default {
//     createFuncOrder,
//     createMoMoPayment
// };
