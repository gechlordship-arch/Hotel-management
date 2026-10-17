const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Guest', {
    full_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    id_proof_type: {
      type: DataTypes.ENUM('passport', 'national_id', 'driver_license', 'other'),
      allowNull: true,
    },
    id_proof_number: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
