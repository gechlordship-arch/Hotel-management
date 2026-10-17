'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_guests_id_proof_type" AS ENUM ('passport','national_id','driver_license','other');`
    );

    await queryInterface.createTable('guests', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      full_name: { type: Sequelize.STRING(120), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: true },
      phone: { type: Sequelize.STRING(30), allowNull: false },
      address: { type: Sequelize.TEXT, allowNull: true },
      country: { type: Sequelize.STRING(80), allowNull: true },
      id_proof_type: {
        type: Sequelize.ENUM('passport', 'national_id', 'driver_license', 'other'),
        allowNull: true,
      },
      id_proof_number: { type: Sequelize.STRING(60), allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
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
    await queryInterface.dropTable('guests');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_guests_id_proof_type";`);
  },
};
