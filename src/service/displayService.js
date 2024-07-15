import { where } from "sequelize/lib/sequelize";
import db from "../models";
// Op là một object chứa các toán tử so sánh như Op.in, Op.eq, Op.gt,... để bạn có thể sử dụng trong các truy vấn Sequelize.
const { Op } = require('sequelize');

const getContact1 = async () => {
    try {
        const data = await db.Contact.findAll({
            attributes: ["id_contact", "nameUser", "description", "createdAt"],
            raw: true,
        });
        return {
            EM: 'Fetch contacts successful',
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.error('Error in getContact1:', e);
        return {
            EM: 'Server error',
            EC: 1,
            DT: []
        };
    }
};

const getCommentsByShopId = async (shopId) => {
    try {
        let data = await db.Contact.findAll({
            where: { id_shop: shopId },
            attributes: ["id_contact", "nameUser", "description", "createdAt"],
            raw: true,
        });
        return {
            EM: 'fetch comments ok',
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
};

const getUserOrder = async (username) => {
    try {
        console.log('Username received in service:', username);
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.in]: ['Đã thanh toán']
                },
                username: username // Filter by username
            },
            attributes: ["id_order", "total", 'paymentMethod', "username", "email", "phone", "status", "orderId", "createdAt"],
            raw: true,
        });
        // console.log('Fetched user orders:', data);
        return {
            EM: 'fetch user order ok',
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.error('Error in getUserOrder:', e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        };
    }
};

const getCheckDoanhThuDetail = async () => {
    try {
        let data = await db.OrderDetail.findAll({
            where: {
                status: {
                    [Op.in]: ['Đã thanh toán']
                }
            },
            attributes: ["id_orderdetail", "id_order", "nameProduct", "district", "price", "quantity", "status", "createdAt"],
        });
        return {
            EM: 'fetch check doanh thu details ok',
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        };
    }
};

const getCheckDoanhThu = async () => {
    try {
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.in]: ['Đã thanh toán']
                }
            },
            attributes: ["id_order", "total", 'paymentMethod', "username", "email", "phone",
                "status", "orderId", "createdAt"],
        });
        return {
            EM: 'fetch check doanh thu ok',
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        };
    }
};

const getOrderDetailsByOrderId = async (orderId) => {
    try {
        let data = await db.OrderDetail.findAll({
            where: { id_order: orderId },
            attributes: ["id_orderdetail", "id_order", "nameProduct", "district", "price", "quantity", "status", "createdAt"],
            order: [['id_orderdetail', 'DESC']]
        });
        return {
            EM: 'fetch order details ok',
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        };
    }
};

const getCheckOrderwithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Order.findAndCountAll({
            where: {
                status: {
                    [Op.in]: ['Đã thanh toán', 'Chưa thanh toán']
                }
            },
            offset: offset,
            limit: limit,
            attributes: ["id_order", "total", 'paymentMethod', "username", "email", "phone",
                "status", "orderId", "createdAt"],
            order: [['id_order', 'DESC']]
        });

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            checkorder: rows
        };

        return {
            EM: 'fetch checkorder ok',
            EC: 0,
            DT: data
        };

    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server',
            EC: 1,
            DT: []
        };
    }
};

const getProduct1 = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings", "id_type_product"],
            where: {
                // id_type_product: 5
            },
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

const getProductEvent = async () => {
    try {
        let data = await db.Product.findAll({
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings", "id_type_product"],
            where: {
                collection: 5
            },
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
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings"],
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
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings"],
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
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings"],
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
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings"],
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
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings"],
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
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings"],
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
            attributes: ["id_product", "nameProduct", "thumbnail", "pricedown", "price", "quantity", "collection", "fastDelivery", "ratings"],
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
    getProduct1, getProductkfc, getProductcom, getProductsushi, getProductbun,
    getProductsang, getProducttrua, getProducttoi,
    getCheckOrderwithPagination, getOrderDetailsByOrderId,
    getCheckDoanhThu, getCheckDoanhThuDetail,
    getUserOrder, getProductEvent,
    getCommentsByShopId, getContact1
}