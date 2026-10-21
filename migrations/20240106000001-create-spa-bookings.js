'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_spa_bookings_status" AS ENUM ('scheduled','completed','cancelled');`
    );

    await queryInterface.createTable('spa_bookings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      guest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'guests', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      spa_service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'spa_services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      booking_date: { type: Sequelize.DATEONLY, allowNull: false },
      start_time: { type: Sequelize.STRING(10), allowNull: false },
      status: {
        type: Sequelize.ENUM('scheduled', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'scheduled',
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('spa_bookings');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_spa_bookings_status";`);
  },
};
