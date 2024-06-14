'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here,with the foreign key being defined in the source model (A).
      // (A.hasOne(B)) One-To-One, A and B,foreign key B 
      // (A.belongsTo(B)) One-To-One, A and B,foreign key A
      // ( A.hasMany(B)) One-To-Many, A and B,foreign key B 
      // ( A.belongsToMany(B, { through: 'C' })) Many-To-Many, A and B, using table C(aId and bId, )  foreign key C
      User.belongsTo(models.Group);
      User.belongsToMany(models.Project, { through: 'Project_User' })
      // User.belongsTo(models.Order, { foreignKey: 'id_order' });
    }
  };
  User.init({
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};