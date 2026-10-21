const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const User = require('./User')(sequelize);
const RoomType = require('./RoomType')(sequelize);
const Room = require('./Room')(sequelize);
const Guest = require('./Guest')(sequelize);
const Reservation = require('./Reservation')(sequelize);
const Payment = require('./Payment')(sequelize);

// Room & Type
RoomType.hasMany(Room, { foreignKey: 'room_type_id', as: 'rooms' });
Room.belongsTo(RoomType, { foreignKey: 'room_type_id', as: 'roomType' });

// Guest & Reservation
Guest.hasMany(Reservation, { foreignKey: 'guest_id', as: 'reservations' });
Reservation.belongsTo(Guest, { foreignKey: 'guest_id', as: 'guest' });

// Room & Reservation
Room.hasMany(Reservation, { foreignKey: 'room_id', as: 'reservations' });
Reservation.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });

// Reservation & Payment
Reservation.hasMany(Payment, { foreignKey: 'reservation_id', as: 'payments' });
Payment.belongsTo(Reservation, { foreignKey: 'reservation_id', as: 'reservation' });

module.exports = { sequelize, Sequelize, User, RoomType, Room, Guest, Reservation, Payment };
