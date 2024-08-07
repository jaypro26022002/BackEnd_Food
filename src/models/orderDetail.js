'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 1 shop co nhieu san pham,foreign key Product
            // OrderDetail.hasMany(models.Product)
            OrderDetail.belongsTo(models.Order, { foreignKey: 'id_order' });
        }
    };
    OrderDetail.init({
        id_orderdetail: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_order: DataTypes.INTEGER,
        id_product: DataTypes.INTEGER,
        nameProduct: DataTypes.STRING,
        district: DataTypes.STRING,
        id_ship: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        status: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'OrderDetail',
    });
    return OrderDetail;
};