'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_rooms_status" AS ENUM ('available','occupied','cleaning','maintenance');`
    );

    await queryInterface.createTable('rooms', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      room_number: { type: Sequelize.STRING(10), allowNull: false, unique: true },
      room_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'room_types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      floor: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      status: {
        type: Sequelize.ENUM('available', 'occupied', 'cleaning', 'maintenance'),
        allowNull: false,
        defaultValue: 'available',
      },
      image_url: { type: Sequelize.STRING(255), allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('rooms');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_rooms_status";`);
  },
};
