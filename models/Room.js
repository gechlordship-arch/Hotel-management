const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Room', {
    room_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    room_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.ENUM('available', 'occupied', 'cleaning', 'maintenance'),
      allowNull: false,
      defaultValue: 'available',
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
