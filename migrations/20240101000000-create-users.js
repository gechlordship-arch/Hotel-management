'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_users_role" AS ENUM ('admin','receptionist','housekeeping');`
    );

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      password: { type: Sequelize.STRING(255), allowNull: false },
      role: {
        type: Sequelize.ENUM('admin', 'receptionist', 'housekeeping'),
        allowNull: false,
        defaultValue: 'receptionist',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_users_role";`);
  },
};