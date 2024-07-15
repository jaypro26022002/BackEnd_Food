import db from "../models"

const getShopWeb = async () => {
    try {
        let data = await db.Shop.findAll({
            attributes: ["id_shop", "thumbnail", "nameShop", 'address', "timeWork", 'price', "rating"],
            where: {
                id_shop: 2
            },
            raw: true,
        });
        return {
            EM: 'fetch shop ok',
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
const getShopWeb2 = async () => {
    try {
        let data = await db.Shop.findAll({
            attributes: ["id_shop", "thumbnail", "nameShop", 'address', "timeWork", 'price', "rating"],
            where: {
                id_shop: 1
            },
            raw: true,
        });
        return {
            EM: 'fetch shop ok',
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
const getShopWeb3 = async () => {
    try {
        let data = await db.Shop.findAll({
            attributes: ["id_shop", "thumbnail", "nameShop", 'address', "timeWork", 'price', "rating"],
            where: {
                id_shop: 3
            },
            raw: true,
        });
        return {
            EM: 'fetch shop ok',
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
const getShopWeb4 = async () => {
    try {
        let data = await db.Shop.findAll({
            attributes: ["id_shop", "thumbnail", "nameShop", 'address', "timeWork", 'price', "rating"],
            where: {
                id_shop: 4
            },
            raw: true,
        });
        return {
            EM: 'fetch shop ok',
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

const getContact = async () => {
    try {
        let data = await db.Contact.findAll({
            attributes: ["id_contact", "nameUser", "description"],
            raw: true,
        });
        return {
            EM: 'fetch contact ok',
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

const createNewContact = async (data) => {
    try {
        await db.Contact.create({
            nameUser: data.nameUser,
            description: data.description,
            id_shop: data.id_shop,
        });
        return {
            EM: 'Create contact ok',
            EC: 0,
            DT: []
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error from Otherserver',
            EC: -1,
            DT: []
        };
    }
};

const getNewwithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        // findAndCountAll: hàm truy xuất dữ liệu có trong 1 trang(VD: cho 5 phần tử xuất hiện trong trang 1)
        //count :
        const { count, rows } = await db.New.findAndCountAll({
            offset: offset,
            limit: limit,
            // sort: '' hàm sort kiếm theo ý muốn(id,name,..) tìm hiểu thêm 
            attributes: ["id_new", "title", "description", "id_img"],
            order: [['id_new', 'DESC']]
        })

        //công thức tổng số trang 
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            new: rows
        }

        return {
            EM: 'fetch new ok',
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

const createNewnew = async (data) => {
    try {
        await db.New.create({
            nameNew: data.nameNew,
        });
        return {
            EM: 'Create new ok',
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

const updateNew = async (data) => {
    try {
        // if (!data.groupId) {
        //     return {
        //         EM: 'error with empty groupId',
        //         EC: 1,
        //         DT: 'group'
        //     }
        // }
        let neW = await db.New.findOne({
            where: { id: data.id_new }
        })
        if (neW) {
            //update
            await neW.update({
                title: data.title,
                description: data.description,
                id_img: data.id_img,
            })
            return {
                EM: 'update neW success ',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'neW not found',
                EC: 2,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server dishesApiservice',
            EC: 1,
            DT: []
        }
    }
}

// const deleteNew = async (id) => {
//     try {
//         let user = await db.User.findOne({
//             where: { id: id }
//         })
//         if (user) {
//             await user.destroy();
//             return {
//                 EM: 'Delete successful',
//                 EC: 0,
//                 DT: []
//             }
//         }
//     } catch (e) {
//         console.log(e);
//         return {
//             EM: 'something wrong with server',
//             EC: 1,
//             DT: []
//         }
//     }
// }

const getShopwithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        // findAndCountAll: hàm truy xuất dữ liệu có trong 1 trang(VD: cho 5 phần tử xuất hiện trong trang 1)
        //count :
        const { count, rows } = await db.Shop.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id_shop", "thumbnail", "nameShop", 'address', "timeWork", "rating", "price"],
            include: {
                model: db.TypeProduct,
                attributes: ["nameType", "id_type_product"]
            },
            order: [['id_shop', 'DESC']]
        });
        //công thức tổng số trang 
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            shop: rows
        }
        return {
            EM: 'fetch shop ok',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with Otherserver',
            EC: 1,
            DT: []
        }
    }
}
const createNewShop = async (data) => {
    try {
        await db.Shop.create({
            nameShop: data.nameShop,
            thumbnail: data.thumbnail,  // Ensure to use `image` from the request
            address: data.address,
            timeWork: data.timeWork,
            rating: data.rating,
            price: data.price,
            id_type_product: data.id_type_product,
        });
        // console.log()
        return {
            EM: 'Create shop ok',
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
const updateShop = async (data) => {
    try {
        let shop = await db.Shop.findOne({
            where: { id_shop: data.id_shop }
        });

        if (shop) {
            // Update shop
            shop.nameShop = data.nameShop;
            shop.thumbnail = data.thumbnail;
            shop.address = data.address;
            shop.timeWork = data.timeWork;
            shop.rating = data.rating;
            shop.price = data.price;
            shop.id_type_product = data.id_type_product;

            await shop.save();

            return {
                EM: 'update shop success',
                EC: 0,
                DT: ''
            };
        } else {
            // Shop not found
            return {
                EM: 'shop not found',
                EC: 2,
                DT: '',
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server OtherService',
            EC: 1,
            DT: []
        };
    }
};
const deleteShop = async (id_shop) => {
    try {
        let user = await db.Shop.findOne({
            where: { id_shop: id_shop }
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
    getNewwithPagination, createNewnew, updateNew,
    getShopwithPagination, createNewShop, updateShop, deleteShop,
    createNewContact, getContact,
    getShopWeb, getShopWeb2, getShopWeb3, getShopWeb4,
}