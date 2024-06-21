import dishesApiService from '../service/dishesApiService'
import ordersService from '../service/dishesApiService'; // Create this service
import multer from 'multer';


const readFuncProduct = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // them + de chuyen du lieu qua kieu? int(so')
            let data = await dishesApiService.getProductwithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC, // error code
                DT: data.DT, //datas
            })
        }
        console.log("check data readproduct", data)
    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server disController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

const upload = multer().single('image');

const createFuncProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                EM: 'File is required',
                EC: 1,
                DT: ''
            });
        }

        const thumbnail = req.file.filename;
        const { nameProduct, pricedown, price, quantity, collection, fastDelivery, ratings, id_type_product } = req.body;

        console.log("check req filename", req.file)


        let data = await dishesApiService.createNewProduct({
            nameProduct,
            thumbnail,
            pricedown,
            price,
            quantity,
            collection,
            fastDelivery,
            ratings,
            id_type_product
        });
        console.log('Received data:', data); // Log the input data for debugging

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


const updateFuncProduct = async (req, res) => {
    try {
        // Extract data from req.body and req.file
        const data = {
            id_product: req.body.id_product,
            nameProduct: req.body.nameProduct,
            pricedown: req.body.pricedown,
            price: req.body.price,
            quantity: req.body.quantity,
            collection: req.body.collection,
            ratings: req.body.ratings,
            fastDelivery: req.body.fastDelivery,
            id_type_product: req.body.id_type_product,
            thumbnail: req.file ? req.file.filename : req.body.thumbnail,
        };

        console.log('Received data:', data); // Log the input data for debugging

        let response = await dishesApiService.updateProduct(data);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server dishesController update',
            EC: '-1',
            DT: '',
        });
    }
};

const deleteFuncProduct = async (req, res) => {
    try {
        let data = await dishesApiService.deleteUser(req.body.id);
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

const readFuncType = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // them + de chuyen du lieu qua kieu? int(so')
            let data = await dishesApiService.getTypewithPagination(+page, +limit);
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

const createFuncType = async (req, res) => {
    try {
        //validate
        let data = await dishesApiService.createNewType(req.body);
        console.log('control data', data)
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

const updateFuncType = async (req, res) => {
    try {
        //validate
        let data = await dishesApiService.updateFuncType(req.body);
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

// const deleteFuncType = async (req, res) => {
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

// ordersController.js




module.exports = {
    readFuncProduct, createFuncProduct, updateFuncProduct, deleteFuncProduct,
    readFuncType, createFuncType, updateFuncType,

}