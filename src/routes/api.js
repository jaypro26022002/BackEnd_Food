import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from '../controller/groupController';
import dishesController from '../controller/dishesController';
import OtherController from '../controller/OtherController';
import express from "express";

const app = express();
app.use(express.json());

import homeController from '../controller/homeController';
import displayController from '../controller/displayController';
import orderController from '../controller/orderController';
// import createOrderController from '../controller/createOrderController';
import multer from "multer";
import path from "path";

import db from "../models";

// const { inspect } = require('util');
import { checkUserJWT, checkUserPermision } from '../middleware/JWTAction';

var appRoot = require("app-root-path");
const router = express.Router();

/** expres app */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image")
        console.log(">> check appRoot:", appRoot)
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
let upload = multer({ storage: storage, fileFilter: imageFilter });


// imagine
router.get("/getimg", homeController.getUploadFilePage)
router.post('/upload-image', upload.single('image'), homeController.handleUploadFile)

router.get('/shop1/:shopId/comments', displayController.getComments); // Add this line
router.get('/shop2/:shopId/comments', displayController.getComments); // Add this line
router.get('/shop3/:shopId/comments', displayController.getComments); // Add this line
router.get('/shop4/:shopId/comments', displayController.getComments); // Add this line

router.get('/product/readevent', displayController.getfuncProductEvent);



const initApiRoutes = (app) => {

    //rest api 
    //GET,POST,PU,DELETE
    // test upload file
    router.get("/getimg", homeController.getUploadFilePage)
    router.post('/upload-image', upload.single('image'), homeController.handleUploadFile)

    // router.all : sẽ check user quyền các role(/user/read, /group/read, ...)-> so sánh url trên Database mới cho chạy đống code dưới
    // qua 2 midleware(checkUserJWT, checkUserPermision)
    router.all('*', checkUserJWT, checkUserPermision)
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    router.post('/logout', apiController.handleLogout);

    router.get('/account', userController.getUserAccount);

    // guest
    router.get('/product/readsang', displayController.getfunProductsang);
    router.get('/product/readtrua', displayController.getfunProducttrua);
    router.get('/product/readtoi', displayController.getfunProducttoi);
    router.get('/product/readsushi', displayController.getfunProductsushi);
    router.get('/product/readbun', displayController.getfunProductbun);
    router.get('/product/readcom', displayController.getfunProductcom);
    router.get('/product/readkfc', displayController.getfunProductkfc);
    router.get('/product/read1', displayController.getfuncProduct1);

    // cửa hàng 
    router.get('/shop/readShop', OtherController.readFuncShopWeb);
    router.get('/shop/readShop2', OtherController.readFuncShopWeb2);
    router.get('/shop/readShop3', OtherController.readFuncShopWeb3);
    router.get('/shop/readShop4', OtherController.readFuncShopWeb4);

    //login

    // 
    //nhan vien/admin
    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);
    //--- adminOrder
    router.get('/adminorder/read', displayController.readFuncCheckOrder);
    router.get('/adminorderdetail/read', displayController.readOrderDetailsByOrderId);
    router.get('/adminorder/checkdoanhthu', displayController.readFuncCheckDoanhThu);
    router.get('/adminorder/checkdoanhthuDetail', displayController.readFuncCheckDoanhThuDetail);

    //--- group
    router.get('/group/read', groupController.readFunc);
    //--- product
    router.get('/product/read', dishesController.readFuncProduct);
    router.post('/product/create', upload.single('image'), dishesController.createFuncProduct);
    router.put('/product/update', upload.single('image'), dishesController.updateFuncProduct);
    router.delete('/product/delete', dishesController.deleteFuncProduct);
    //--- Contact
    router.get('/feedback/readContact', OtherController.readFuncContact);
    router.post('/create/contact', OtherController.handleContact);

    //--- shop
    router.get('/shop/read', OtherController.readFuncShop);
    router.post('/shop/create', upload.single('image'), OtherController.createFuncShop);
    router.put('/shop/update', upload.single('image'), OtherController.updateFuncShop);
    router.delete('/shop/delete', OtherController.deleteFuncShop);


    // Login

    // router.get('/product/readevent', displayController.getfuncProductenvent);
    router.get('/shop1/readContactshop', displayController.getfuncGetContact1);

    //--- doanh thu
    router.get('/userorder/checkdoanhthu', displayController.readFuncUserOrder);





    // test upload file
    // router.get("/upload", homeController.getUploadFilePage)
    // router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)

    router.post('/orders', orderController.createFuncOrder);
    router.post('/momo/payment', orderController.createMoMoPayment);
    app.post('/callback', async (req, res) => {
        try {
            console.log("Callback request body:", req.body);
            let data = req.body; // Assuming MoMo sends data as part of request body
            console.log('MoMo callback data:', data);

            // Find order in database based on orderId from MoMo
            const order = await db.Order.findOne({
                where: { orderId: data.orderId }
            });

            if (order) {
                // Update order and order details based on resultCode condition
                if (data.resultCode === 0) {
                    order.status = 'Đã thanh toán'; // Update status to 'Đã thanh toán' if resultCode is 0
                    await db.OrderDetail.update(
                        { status: 'Đã thanh toán' },
                        { where: { id_order: order.id_order } }
                    );
                } else {
                    order.status = 'Chưa thanh toán'; // Update status to 'Chưa thanh toán' otherwise
                    await db.OrderDetail.update(
                        { status: 'Chưa thanh toán' },
                        { where: { id_order: order.id_order } }
                    );
                }

                await order.save();

                res.json({
                    EM: 'Update Order success',
                    EC: 0,
                    DT: ''
                });
            } else {
                res.status(404).json({
                    EM: 'Order not found',
                    EC: 2,
                    DT: ''
                });
            }
        } catch (e) {
            console.error("Error in updateOrder:", e);
            res.status(500).json({
                EM: 'Something went wrong with the server',
                EC: 1,
                DT: []
            });
        }
    });
    router.post('/check-status-transaction', async (req, res) => {
        try {
            const { orderId } = req.body;

            // Calculate signature
            const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
            const accessKey = 'F8BBA842ECF85';
            const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

            const signature = crypto
                .createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');

            // Prepare request body
            const requestBody = JSON.stringify({
                partnerCode: 'MOMO',
                requestId: orderId,
                orderId: orderId,
                signature: signature,
                lang: 'vi',
            });

            // Setup axios options for POST request
            const options = {
                method: 'POST',
                url: 'https://test-payment.momo.vn/v2/gateway/api/query',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: requestBody,
            };

            // Send POST request to MoMo API
            const response = await axios(options);

            // Return MoMo API response to client
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error checking transaction status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return app.use("/api/v1", router)
}

export default initApiRoutes;