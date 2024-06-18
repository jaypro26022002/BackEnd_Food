import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from '../controller/groupController';
import dishesController from '../controller/dishesController';
import OtherController from '../controller/OtherController';
import express from "express";
import homeController from '../controller/homeController';
import displayController from '../controller/displayController';
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

    router.get("/getimg", homeController.getUploadFilePage)
    router.post('/upload-image', upload.single('image'), homeController.handleUploadFile)

    // router.get('/type/read', dishesController.readFuncProduct);
    // router.post('/type/create', dishesController.createFuncProduct);
    // router.put('/type/update', dishesController.updateFuncProduct);

    // router.get('/new/read', OtherController.readFuncNew);
    // router.post('/new/create', OtherController.createFuncNew);
    // router.put('/new/update', OtherController.updateFuncNew);

    // router.post('/contact', OtherController.handleContact);

    // router.get('/shop/read', OtherController.readFuncShop);
    // router.get('/type1/read', groupController.readFuncT);
    router.post('/shop/create', upload.single('image'), OtherController.createFuncShop);
    // router.put('/shop/update', OtherController.updateFuncShop);
    // router.delete('/shop/delete', userController.deleteFuncShop);


    // test upload file
    // router.get("/upload", homeController.getUploadFilePage)
    // router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)




    return app.use("/api/v1", router)
}

export default initApiRoutes;