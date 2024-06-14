'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Mỗi sản phẩm (product) chỉ thuộc về một loại sản phẩm (type_product).
            Product.belongsTo(models.TypeProduct, { foreignKey: 'id_type_product' });
            Product.belongsTo(models.Shop, { foreignKey: 'id_shop' })
        }
    };
    Product.init({
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nameProduct: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        collection: DataTypes.STRING,
        pricedown: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        id_type_product: DataTypes.INTEGER,
        id_shop: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};