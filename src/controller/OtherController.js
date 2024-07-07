import OtherService from '../service/OtherService'

const readFuncShopWeb = async (req, res) => {
    try {
        // them + de chuyen du lieu qua kieu? int(so')
        let data = await OtherService.getShopWeb();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server OtherController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
const readFuncShopWeb2 = async (req, res) => {
    try {
        // them + de chuyen du lieu qua kieu? int(so')
        let data = await OtherService.getShopWeb2();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server OtherController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
const readFuncShopWeb3 = async (req, res) => {
    try {
        // them + de chuyen du lieu qua kieu? int(so')
        let data = await OtherService.getShopWeb3();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server OtherController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
const readFuncShopWeb4 = async (req, res) => {
    try {
        // them + de chuyen du lieu qua kieu? int(so')
        let data = await OtherService.getShopWeb4();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server OtherController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

const readFuncContact = async (req, res) => {
    try {
        // them + de chuyen du lieu qua kieu? int(so')
        let data = await OtherService.getContact();
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
const handleContact = async (req, res) => {
    try {
        //validate
        let data = await OtherService.createNewContact(req.body);
        // console.log('control data', req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server userController create',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

const readFuncNew = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // them + de chuyen du lieu qua kieu? int(so')
            let data = await OtherService.getNewwithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC, // error code
                DT: data.DT, //datas
            })
        }

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server disController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

const createFuncNew = async (req, res) => {
    try {
        //validate
        let data = await OtherService.createNewnew(req.body);
        // console.log('control data', data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

const updateFuncNew = async (req, res) => {
    try {
        //validate
        let data = await OtherService.updateFuncNew(req.body);
        // console.log('control data', data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server disController update',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

// const deleteFuncNew = async (req, res) => {
//     try {
//         let data = await userApiService.deleteUser(req.body.id);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC, // error code
//             DT: data.DT, //data
//         })
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({
//             EM: 'error from server',// error messeger
//             EC: '-1', // error code
//             DT: '' //data
//         })
//     }
// }

const readFuncShop = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // them + de chuyen du lieu qua kieu? int(so')
            let data = await OtherService.getShopwithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC, // error code
                DT: data.DT, //datas
            })
        }

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server OtherController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

const createFuncShop = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                EM: 'File is required',
                EC: 1,
                DT: ''
            });
        }

        const thumbnail = req.file.filename;
        const { nameShop, address, rating, price, timeWork, id_type_product } = req.body;

        console.log("check req filename shop", req.file)

        let data = await OtherService.createNewShop({
            nameShop,
            thumbnail,
            address,
            rating,
            timeWork,
            price,
            id_type_product
        });

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
};

const updateFuncShop = async (req, res) => {
    try {
        const data = {
            id_shop: req.body.id_shop,
            nameShop: req.body.nameShop,
            timeWork: req.body.timeWork,
            rating: req.body.rating,
            price: req.body.price,
            address: req.body.address,
        }
        let response = await OtherService.updateShop(data); // Ensure req.body.id_shop is correctly set
        // console.log('control data Shop', data)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC, // error code
            DT: response.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server OtherController update',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
const deleteFuncShop = async (req, res) => {
    try {
        let data = await OtherService.deleteShop(req.body.id_shop);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server OtherController deleted',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}



module.exports = {
    readFuncNew, createFuncNew, updateFuncNew,
    readFuncShop, createFuncShop, updateFuncShop, deleteFuncShop,
    handleContact, readFuncContact,
    readFuncShopWeb, readFuncShopWeb2, readFuncShopWeb3, readFuncShopWeb4

}