import displayService from '../service/displayService'

const getfuncGetContact1 = async (req, res) => {
    try {
        const data = await displayService.getContact1();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (e) {
        console.error('Error in getfuncGetContact1:', e);
        return res.status(500).json({
            EM: 'Server error',
            EC: '-1',
            DT: []
        });
    }
};

let getComments = async (req, res) => {
    try {
        let shopId = req.params.shopId;
        let data = await displayService.getCommentsByShopId(shopId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        });
    }
};

const readFuncUserOrder = async (req, res) => {
    try {
        const { username } = req.query;
        // console.log('Received username:', username);
        let data = await displayService.getUserOrder(username);
        // console.log('Service response:', data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error('Error in readFuncUserOrder:', e);
        return res.status(500).json({
            EM: 'error from server displayController',
            EC: '-1',
            DT: ''
        });
    }
};

const readFuncCheckDoanhThuDetail = async (req, res) => {
    try {
        let data = await displayService.getCheckDoanhThuDetail();
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
const readFuncCheckDoanhThu = async (req, res) => {
    try {
        let data = await displayService.getCheckDoanhThu();
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
        let data = await displayService.getProduct1();
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
let getfuncProductEvent = async (req, res) => {
    try {
        let data = await displayService.getProductEvent();
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
    readFuncCheckOrder, readOrderDetailsByOrderId,
    readFuncCheckDoanhThu, readFuncCheckDoanhThuDetail,
    readFuncUserOrder,
    getfuncProductEvent,
    getComments, getfuncGetContact1
}

