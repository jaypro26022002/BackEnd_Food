'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Img extends Model {
    static associate(models) {
      // define association here
      // Img.belongsToMany(models.User, { through: 'Project_User' });
    }
  };
  Img.init({
    id_img: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Img',
  });
  return Img;
};