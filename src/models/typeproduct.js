'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TypeProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Một loại sản phẩm (type_product) có thể có nhiều sản phẩm (product).foreign key Product
            // ( A.hasMany(B)) One-To-Many, A and B,foreign key B 
            TypeProduct.hasMany(models.Product, { foreignKey: 'id_type_product' })
            TypeProduct.hasMany(models.Shop, { foreignKey: 'id_type_product' });
        }
    };
    TypeProduct.init({
        id_type_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nameType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TypeProduct',
    });
    return TypeProduct;
};