import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from '../controller/groupController';
import dishesController from '../controller/dishesController';
import OtherController from '../controller/OtherController';
import express from "express";
import homeController from '../controller/homeController';
import displayController from '../controller/displayController';
import orderController from '../controller/orderController';
import multer from "multer";
import path from "path";
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


const initApiRoutes = (app) => {
    //rest api 
    //GET,POST,PU,DELETE
    // test upload file
    router.get("/getimg", homeController.getUploadFilePage)
    router.post('/upload-image', upload.single('image'), homeController.handleUploadFile)

    // display

    router.get('/product/readsushi', displayController.getfunProductsushi);
    router.get('/product/readbun', displayController.getfunProductbun);
    router.get('/product/readsang', displayController.getfunProductsang);
    router.get('/product/readtrua', displayController.getfunProducttrua);
    router.get('/product/readtoi', displayController.getfunProducttoi);
    router.post('/contact', OtherController.handleContact);


    // router.all : sẽ check user quyền các role(/user/read, /group/read, ...)-> so sánh url trên Database mới cho chạy đống code dưới
    // qua 2 midleware(checkUserJWT, checkUserPermision)
    router.all('*', checkUserJWT, checkUserPermision)
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    router.post('/logout', apiController.handleLogout);

    router.get('/account', userController.getUserAccount);

    router.get('/product/read1', displayController.getfuncProduct1);
    router.get('/product/readcom', displayController.getfunProductcom);
    router.get('/product/readkfc', displayController.getfunProductkfc);

    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    router.get('/group/read', groupController.readFunc);

    router.get('/product/read', dishesController.readFuncProduct);
    router.post('/product/create', upload.single('image'), dishesController.createFuncProduct);
    router.put('/product/update', upload.single('image'), dishesController.updateFuncProduct);
    router.delete('/user/delete', dishesController.deleteFuncProduct);

    router.get("/getimg", homeController.getUploadFilePage)
    router.post('/upload-image', upload.single('image'), homeController.handleUploadFile)

    // router.get('/type/read', dishesController.readFuncProduct);
    // router.post('/type/create', dishesController.createFuncProduct);
    // router.put('/type/update', dishesController.updateFuncProduct);

    // router.get('/new/read', OtherController.readFuncNew);
    // router.post('/new/create', OtherController.createFuncNew);
    // router.put('/new/update', OtherController.updateFuncNew);

    router.get('/feedback/readContact', OtherController.readFuncContact);
    router.get('/shop/readShop', OtherController.readFuncShopWeb);
    router.get('/shop/readShop2', OtherController.readFuncShopWeb2);
    router.get('/shop/readShop3', OtherController.readFuncShopWeb3);
    router.get('/shop/readShop4', OtherController.readFuncShopWeb4);


    router.get('/shop/read', OtherController.readFuncShop);
    // router.get('/type1/read', groupController.readFuncT);
    router.post('/shop/create', upload.single('image'), OtherController.createFuncShop);
    router.put('/shop/update', upload.single('image'), OtherController.updateFuncShop);
    router.delete('/shop/delete', OtherController.deleteFuncShop);


    // test upload file
    // router.get("/upload", homeController.getUploadFilePage)
    // router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)

    router.post('/orders', orderController.createFuncOrder);
    router.post('/momo/payment', orderController.createMoMoPayment);

    app.post('/callback', async (req, res) => {
        try {
            console.log("Received callback request:");
            console.log(req.body); // Logging the request body

            // Call the corresponding controller function to handle MoMo payment logic
            await orderController.createMoMoPayment(req, res);

        } catch (error) {
            console.error("Error in POST /callback:", error);
            res.status(500).json({ error: 'Internal Server Error' });
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


// router.post('/callback', async (req, res) => {
//     console.log("callback: ");
//     console.log(req.body);

//     return res.status(200).json(req.body)
// })