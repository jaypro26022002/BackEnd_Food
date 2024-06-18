import displayService from '../service/displayService'

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
    getfunProductsang, getfunProducttrua, getfunProducttoi
}

