import db from "../models";

const getProductwithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        // findAndCountAll: hàm truy xuất dữ liệu có trong 1 trang(VD: cho 5 phần tử xuất hiện trong trang 1)
        //count :
        const { count, rows } = await db.Product.findAndCountAll({
            offset: offset,
            limit: limit,
            // sort: '' hàm sort kiếm theo ý muốn(id,name,..) tìm hiểu thêm 
            attributes: ["id_product", "nameProduct", 'thumbnail', "pricedown", "price", "quantity"],
            order: [['id_product', 'DESC']]
        })

        //công thức tổng số trang 
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            product: rows
        }

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

const createNewProduct = async (data) => {
    try {
        await db.Product.create({
            nameProduct: data.nameProduct,
            thumbnail: data.thumbnail,  // Ensure to use `image` from the request
            pricedown: data.pricedown,
            price: data.price,
            quantity: data.quantity,
        });
        return {
            EM: 'Create product ok',
            EC: 0,
            DT: []
        };
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return {
            EM: 'Error from server',
            EC: -1,
            DT: []
        };
    }
};

const updateProduct = async (data) => {
    try {
        console.log('Received data:', data); // Log the input data for debugging

        let product = await db.Product.findOne({
            where: { id_product: data.id_product }
        });

        if (product) {
            // Update product details
            await product.update({
                nameProduct: data.nameProduct,
                thumbnail: data.thumbnail,
                pricedown: data.pricedown,
                price: data.price,
                id_type_product: data.id_type_product,
                quantity: data.quantity,
            });
            return {
                EM: 'update product success',
                EC: 0,
                DT: ''
            };
        } else {
            return {
                EM: 'product not found',
                EC: 2,
                DT: '',
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong with server dishesApiService',
            EC: 1,
            DT: [],
        };
    }
};



// const deleteUser = async (id) => {
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

const getTypewithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        // findAndCountAll: hàm truy xuất dữ liệu có trong 1 trang(VD: cho 5 phần tử xuất hiện trong trang 1)
        //count :
        const { count, rows } = await db.Type_product.findAndCountAll({
            offset: offset,
            limit: limit,
            // sort: '' hàm sort kiếm theo ý muốn(id,name,..) tìm hiểu thêm 
            attributes: ["id_type_product", "nameType"],
            order: [['id_type_product', 'DESC']]
        })

        //công thức tổng số trang 
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            product: rows
        }

        return {
            EM: 'fetch type ok',
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

const createNewType = async (data) => {
    try {
        await db.Type_product.create({
            nameType: data.nameType,
        });
        return {
            EM: 'Create product ok',
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

const updateType = async (data) => {
    try {
        // if (!data.groupId) {
        //     return {
        //         EM: 'error with empty groupId',
        //         EC: 1,
        //         DT: 'group'
        //     }
        // }
        let type = await db.Type_product.findOne({
            where: { id: data.id_type_product }
        })
        if (type) {
            //update
            await type.update({
                nameType: data.nameType,
            })
            return {
                EM: 'update type success ',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'food not found',
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

// const deleteType = async (id) => {
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


module.exports = {
    getProductwithPagination, createNewProduct, updateProduct,
    getTypewithPagination, createNewType, updateType
}