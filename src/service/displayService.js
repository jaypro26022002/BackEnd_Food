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

const getProductkfc = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            where: {
                id_type_product: 2
            },
            raw: true,
        });
        return {
            EM: 'fetch product kfc ok',
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
const getProductcom = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            where: {
                id_type_product: 1
            },
            raw: true,
        });
        return {
            EM: 'fetch product com ok',
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
const getProductsushi = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            where: {
                id_type_product: 3
            },
            raw: true,
        });
        return {
            EM: 'fetch product sushi ok',
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
const getProductbun = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            where: {
                id_type_product: 4
            },
            raw: true,
        });
        return {
            EM: 'fetch product kfc ok',
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
const getProductsang = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            where: {
                collection: 1
            },
            raw: true,
        });
        return {
            EM: 'fetch product kfc ok',
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
const getProducttrua = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            where: {
                collection: 2
            },
            raw: true,
        });
        return {
            EM: 'fetch product kfc ok',
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
const getProducttoi = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity"],
            where: {
                collection: 3
            },
            raw: true,
        });
        return {
            EM: 'fetch product kfc ok',
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


module.exports = {
    getProduct, getProductkfc, getProductcom, getProductsushi, getProductbun,
    getProductsang, getProducttrua, getProducttoi

}