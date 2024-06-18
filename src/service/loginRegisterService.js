import db from "../models"
import bcrypt from 'bcryptjs';
// Toan' tu sequelize
import { Op } from 'sequelize';
require('dotenv').config();
import { getGroupWithRoles } from '../service/JWTService'
import { createJWT } from '../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}

// ORM
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}

const resgisterNewUser = async (rawUserData) => {
    try {
        //check email/phone are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'the email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'Phone is already exist',
                EC: 1
            }
        }
        // hashPassword(mã hóa password)
        let hashPassword = await hashUserPassword(rawUserData.password);

        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
            groupId: 4
        })

        return {
            EM: 'A user is created  successfully',
            EC: 0
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrong in service...',
            EC: -2
        }
    }
}

// -----------------------------------
// check password login hàm bcrypt.compareSync so sánh inputPassword có trùng hashPassword
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // trả ra KQ true / false 
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })

        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username,
                }
                let token = createJWT(payload)
                return {
                    EM: 'ok!',// error messeger
                    EC: 0, // error code
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }
        // console.log(">> Input user with email/phone ", rawData.valueLogin, "password: ", rawData.password)
        return {
            EM: 'Your email/phone or password iscorrect',// error messeger
            EC: 1, // error code
            DT: '' //data
        }


    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }
}

module.exports = {
    resgisterNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist
}