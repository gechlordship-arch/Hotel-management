const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('RoomType', {
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      validate: { min: 1 },
    },
  });
};
