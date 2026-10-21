const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('SpaBooking', {
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spa_service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.STRING(10), // e.g., "14:00"
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'scheduled',
    },
  });
};
