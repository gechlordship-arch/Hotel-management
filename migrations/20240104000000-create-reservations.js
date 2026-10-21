'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_reservations_status" AS ENUM ('booked','checked_in','checked_out','cancelled');`
    );

    await queryInterface.createTable('reservations', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      guest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'guests', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'rooms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      check_in_date: { type: Sequelize.DATEONLY, allowNull: false },
      check_out_date: { type: Sequelize.DATEONLY, allowNull: false },
      adults: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      children: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      status: {
        type: Sequelize.ENUM('booked', 'checked_in', 'checked_out', 'cancelled'),
        allowNull: false,
        defaultValue: 'booked',
      },
      total_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reservations');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_reservations_status";`);
  },
};
