import db from "../models"

import { checkEmailExist, checkPhoneExist, hashUserPassword } from '../service/loginRegisterService'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            // include db.Group trong bản Group có điều kiện là id: 1 
            include: { model: db.Group, attributes: ["name", "description"] },
            raw: true,
            nest: true,
        });
        // let order = await db.order.findAll({
        //     attributes: ["id", "id_cart"],
        //     // include db.Group trong bản Group có điều kiện là id: 1 
        //     include: { model: db.Cart, attributes: ["nameUser", "nameProduct",'price','quantity'] },

        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'get data []',
                EC: 0,
                DT: []
            }
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        }
    }
}

const getUserwithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        // findAndCountAll: hàm truy xuất dữ liệu có trong 1 trang(VD: cho 5 phần tử xuất hiện trong trang 1)
        //count :
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id_user", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            // sắp xếp theo id và DESC(giảm dần)
            order: [['id_user', 'DESC']]
        })

        //công thức tổng số trang 
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        //check email/phone are exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'the email is already exist',
                EC: 1,
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'Phone is already exist',
                EC: 1,
                DT: 'phone'
            }
        }
        // hashPassword(mã hóa password)
        let hashPassword = await hashUserPassword(data.password);

        // create new user
        // ...data:copy tất cả phần tử ra 1 data fake khác, rồi dùng hashPassword ghi đè lên password
        // data trước(email,username,password,phone) -> data fake(email,username,hashPassword,phone)
        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: 'Create ok',
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e);
    }
}

const updataUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'error with empty groupId',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id_user: data.id_user }
        })
        if (user) {
            //update
            await user.update({
                username: data.username,
                address: data.address,
                phone: data.phone,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'update user success ',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'User not found',
                EC: 2,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server userApiservice',
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete successful',
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updataUser, deleteUser, getUserwithPagination
}