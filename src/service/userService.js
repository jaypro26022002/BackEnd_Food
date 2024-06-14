// thu viện bcypt mã hóa pass
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import Bluebird from 'bluebird';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        //ORM
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        });
    } catch (error) {
        console.log(">> error <<", error);
    }
}

const getUserList = async () => {

    // test Relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        // attributes: in ra những code mong muốn trong model(table SQL)
        attributes: ["id", "username", "email"],
        // include: in ra kèm với model đã Associations(quan hệ với nhau)
        include: { model: db.Group, attributes: ["name", "description"], },
        // raw:  Kết quả trả về sẽ là một mảng các đối tượng JSON các JSON nằm trong  ' ' -> (username: 'vinh')
        raw: true,
        // nest : nhóm các kết quả con vào các đối tượng cha dựa trên quan hệ giữa chúng. Điều này có nghĩa là dữ liệu từ bảng con Group sẽ được nhóm bên trong các đối tượng User 
        nest: true,
    })


    // let roles = await db.Role.findOne({
    //     where: { id: 1 },
    //     include: [{ model: db.Role }],
    //     raw: true,
    //     nestL: true
    // })
    // lấy những Role nào thuộc group có điều kiện id: 1
    // db.Role.findAll(): tìm và hiển thị tất cả Role:/user/edit,/user/show 
    let r = await db.Role.findAll({
        attributes: ["id", "url", "description"],
        // include db.Group trong bản Group có điều kiện là id: 1 
        include: { model: db.Group, where: { id: 1 }, attributes: ["id", "name", "description"], },
        raw: true,
        nest: true
    })

    let users = db.User.findAll();
    return users;
    // const Connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'sellfood', Promise: Bluebird });
    // try {
    //     const [rows, fields] = await Connection.execute('Select * from user ');
    //     return rows;
    // } catch (error) {
    //     console.log(">>>Check error ", error)
    // }
}

const deleteUser = async (userId) => {
    // ORM
    await db.User.destroy({
        where: { id: userId }
    })

}

const getUserById = async (id) => {
    //Kiểu ORM
    let user = {};
    user = await db.User.findOne({
        //id 1:id từ table; id 2 id được tạo ra cho hàm getUserById
        where: { id: id }
    })
    //hàm get này sẽ biến đổi dữ liệu trả ra object kiểu javascript ko Sequelize
    return user.get({ plain: true })
    // kiểu NodeJS
    // const Connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'sellfood', Promise: Bluebird });
    // try {
    //     const [rows, fields] = await Connection.execute('SELECT * FROM user WHERE id= ? ', [id]);
    //     // console.log(">> check rows: ", rows)
    //     return rows;
    // } catch (error) {
    //     console.log(">> check error: ", error);
    // }
}

const updateUserInfor = async (email, username, id) => {
    // ORM
    await db.User.update(
        { emai: email, username: username },
        {
            where: { id: id }
        },
    )
    // kiểu Nodejs
    // const Connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'sellfood', Promise: Bluebird });
    // try {
    //     const [rows, fields] = await Connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ? ', [email, username, id]);
    //     // console.log(">> check rows: ", rows)
    //     return rows;
    // } catch (error) {
    //     console.log(">> check error: ", error);
    // }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}