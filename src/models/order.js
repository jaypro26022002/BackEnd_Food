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
        }
    };
    Order.init({
        id_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};