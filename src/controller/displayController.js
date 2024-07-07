import displayService from '../service/displayService'

const readOrderDetailsByOrderId = async (req, res) => {
    try {
        let orderId = req.query.orderId;
        let data = await displayService.getOrderDetailsByOrderId(orderId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server displayController',
            EC: '-1',
            DT: ''
        });
    }
};

const readFuncCheckOrder = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // them + de chuyen du lieu qua kieu? int(so')
            let data = await displayService.getCheckOrderwithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC, // error code
                DT: data.DT, //datas
            })
        }
        // console.log("check data readCheckorder", data)
    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server disController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

let getfuncProduct1 = async (req, res) => {
    try {
        let data = await displayService.getProduct();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
let getfunProductkfc = async (req, res) => {
    try {
        let data = await displayService.getProductkfc();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
let getfunProductcom = async (req, res) => {
    try {
        let data = await displayService.getProductcom();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
let getfunProductsushi = async (req, res) => {
    try {
        let data = await displayService.getProductsushi();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
let getfunProductbun = async (req, res) => {
    try {
        let data = await displayService.getProductbun();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
let getfunProductsang = async (req, res) => {
    try {
        let data = await displayService.getProductsang();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
let getfunProducttrua = async (req, res) => {
    try {
        let data = await displayService.getProducttrua();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
let getfunProducttoi = async (req, res) => {
    try {
        let data = await displayService.getProducttoi();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

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
    getfuncProduct1, getfunProductkfc, getfunProductcom, getfunProductsushi, getfunProductbun,
    getfunProductsang, getfunProducttrua, getfunProducttoi,
    readFuncCheckOrder, readOrderDetailsByOrderId
}

