import express from "express";
import homeController from "../controller/homeController"
import apiController from "../controller/apiController"
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");

const router = express.Router();

// nơi lưu file ảnh 
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
// console.log(">> check file in web: ", req.file)


/** expres app */

const initWebRoutes = (app) => {
    // router.get(path,hander)
    router.get("/", homeController.handleHelloWord);
    //method get lấy data từ server rồi đẩy ra client
    router.get("/user", homeController.handleUserPage);
    //method post 1 gửi data từ client lên server và luôn đi với chức năng tạo mới users..
    router.post("/user-create", homeController.handleCreateUser);
    //method post 2 xóa người dùng 
    router.post("/user-delete/:id", homeController.handleDeleteUser);
    //method update user
    router.get("/user-update/:id", homeController.getUpdateUserPage);
    router.post("/user/user-update", homeController.handleUpdateUser)

    //rest api 
    //GET,POST,PU,DELETE
    router.get('/api/test-api', apiController.testApi);
    // test upload file
    // router.get("/upload", homeController.getUploadFilePage)
    // router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)

    return app.use("/", router)

}

export default initWebRoutes;