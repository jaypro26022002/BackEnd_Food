require("dotenv").config();
import jwt from "jsonwebtoken";

// hàm bỏ qua cookie vẫn cho người dùng vào trang
// const nonSecurePaths = ['/', '/login', '/register', '/account',
//      '/product/read1'];

const nonSecurePaths = ['/logout', '/login', '/register',
    '/cart', '/carts',
    '/product/read1', '/product/readcom', '/product/readkfc',
];

// createJWT gữi liệu kèm mã hóa nội dung đã gửi để bảo mật thông tin
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    } catch (err) {
        console.log(err)
    }
    return token;
}

// verifyToken mã hóa ngược lại(dịch lại nội dung đã gửi) đoạn createJWT đã gửi
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decoded;
}

const checkUserJWT = (req, res, next) => {
    // hàm bỏ qua cookie vẫn cho người dùng vào trang
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(400).json({
                EC: -1,
                DT: '',
                EM: 'NOT authenthicated the user '
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'NOT authenthicated the user '
        })
    }
}

const checkUserPermision = (req, res, next) => {
    // hàm bỏ qua cookie vẫn cho người dùng vào trang
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't permissions to access this resource...`
            })
        }

        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't permissions to access this resource...`
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'NOT authenthicated the user '
        })
    }
}
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermision
}
