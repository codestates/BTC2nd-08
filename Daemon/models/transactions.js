'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init({
    slot: DataTypes.INTEGER,
    accountKeys: DataTypes.STRING,
    recentBlockhash: DataTypes.STRING,
    signatures: DataTypes.STRING,
    fee: DataTypes.STRING,
    postBalances: DataTypes.STRING,
    preBalances: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};