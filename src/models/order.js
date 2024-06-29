'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 1 shop co nhieu san pham,foreign key Product
            // Order.hasMany(models.User, { foreignKey: 'id_user' })
            Order.hasMany(models.OrderDetail, { foreignKey: 'id_order' });
        }
    };
    Order.init({
        id_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        total: DataTypes.DECIMAL,
        paymentMethod: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};