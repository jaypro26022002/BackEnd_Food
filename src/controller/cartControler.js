import cartService from '../service/cartService';

const readFunc = async (req, res) => {
    try {
        if (req.query) {
            let data = await cartService.getAllProduct();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC, // error code
                DT: data.DT, //data
            })
        }

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

module.exports = {
    read
}