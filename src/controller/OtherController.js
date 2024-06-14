import OtherService from '../service/OtherService'

const handleContact = async (req, res) => {
    try {
        //validate
        let data = await OtherService.createNewContact(req.body);
        // console.log('control data', req.body)
        // console.log('helello')
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
        const { nameShop, address, rating, timeWork, id_type_product } = req.body;

        console.log("check req filename shop", req.file)

        let data = await OtherService.createNewShop({
            nameShop,
            thumbnail,
            address,
            rating,
            timeWork,
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
        //validate
        let data = await OtherService.updateShop(req.body);
        // console.log('control data', data)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
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

module.exports = {
    readFuncNew, createFuncNew, updateFuncNew,
    readFuncShop, createFuncShop, updateFuncShop,
    handleContact

}