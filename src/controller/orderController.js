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
        console.error(e);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        });
    }
};

const createMoMoPayment = async (req, res) => {
    try {
        const { items, total, paymentMethod } = req.body;
        const response = await momoService.createPayment({ items, total, paymentMethod });
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        });
    }
};

export default {
    createFuncOrder,
    createMoMoPayment
};
