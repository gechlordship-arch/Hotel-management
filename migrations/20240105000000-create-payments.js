'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_payments_method" AS ENUM ('cash','credit_card','bank_transfer');`
    );
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_payments_status" AS ENUM ('paid','refunded');`
    );

    await queryInterface.createTable('payments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      reservation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'reservations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      method: {
        type: Sequelize.ENUM('cash', 'credit_card', 'bank_transfer'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('paid', 'refunded'),
        allowNull: false,
        defaultValue: 'paid',
      },
      paid_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payments');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_payments_method";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_payments_status";`);
  },
};
