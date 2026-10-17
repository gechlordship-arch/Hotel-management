'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('room_types', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(80), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      base_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      capacity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 2 },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('room_types');
  },
};
