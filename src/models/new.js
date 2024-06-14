'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class New extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 1 shop co nhieu san pham,foreign key Product
            // New.hasMany(models.Product)
        }
    };
    New.init({
        id_new: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        id_img: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'New',
    });
    return New;
};