'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 1 shop co nhieu san pham,foreign key Product
            // OrderDetail.hasMany(models.Product)
            OrderItem.belongsTo(models.Order, { foreignKey: 'id_order' });
        }
    };
    OrderItem.init({
        id_orderItem: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_order: DataTypes.INTEGER,
        id_product: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'OrderItem',
    });
    return OrderItem;
};