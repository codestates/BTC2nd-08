'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slot: {
        type: Sequelize.INTEGER
      },
      accountKeys: {
        type: Sequelize.STRING
      },
      recentBlockhash: {
        type: Sequelize.STRING
      },
      signatures: {
        type: Sequelize.STRING
      },
      fee: {
        type: Sequelize.STRING
      },
      postBalances: {
        type: Sequelize.STRING
      },
      preBalances: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};