import db from "../models";

const getProduct = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            raw: true,
        });
        return {
            EM: 'fetch product ok',
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
const createNewFood = async (data) => {
    try {
        await db.Food.create({
            nameFood: data.nameFood,
            thumbnail: data.avatar, // Save avatar to thumbnail field
            pricedown: data.pricedown,
            price: data.price,
            quantity: data.quantity,
        });
        return {
            EM: 'Create food ok',
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error from server',
            EC: -1,
            DT: []
        }
    }
};




module.exports = {
    getProduct
}