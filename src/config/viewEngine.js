import express from "express";

/** express app */

//hàm configViewEngine 
const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    //dịch cho express hiểu sử dụng html thông qua view engine framework "ejs" 
    app.set("view engine", "ejs");
    //khi sử dụng html sẽ tìm view trong ""./src/views"
    app.set("views", "./src/views");
}

// trích xuất thư viện(tham chiếu) cho các file khác sử dụng
export default configViewEngine;