import db from "../models";

const getAllProduct = async () => {
    try {
        let users = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            raw: true,
            nest: true,
        });
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

module.exports = {
    getAllProduct
}