import db from "../models";

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            //order: giúp data xuất hiện theo 'name' 'ASC(bản chữ cái ABC'
            order: [['name', 'ASC']]
        });
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error from service',// error messeger
            EC: 1, // error code
            DT: [] //data
        }
    }
}

const getTypes = async () => {
    try {
        let data = await db.TypeProduct.findAll({
            //order: giúp data xuất hiện theo 'name' 'ASC(bản chữ cái ABC'
            order: [['nameType', 'ASC']]
        });
        // console.log(">> check dataType:", data)
        return {
            EM: 'Get types success',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error from Groupservice',// error messeger
            EC: 1, // error code
            DT: [] //data
        }
    }
}

const createNewImg = async (data) => {
    try {
        await db.Img.create({
            image: data.image
        });
        return {
            EM: 'Create img ok',
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e);
    }
}
const getImg = async () => {
    try {
        let data = await db.Img.findAll({});
        // console.log(">> check dataType:", data)
        return {
            EM: 'Get image success',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error from Groupservice',// error messeger
            EC: 1, // error code
            DT: [] //data
        }
    }
}
module.exports = {
    getGroups, getTypes, createNewImg, getImg
}