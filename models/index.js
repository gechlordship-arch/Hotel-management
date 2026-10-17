const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const User = require('./User')(sequelize);
const RoomType = require('./RoomType')(sequelize);
const Room = require('./Room')(sequelize);
const Guest = require('./Guest')(sequelize);

RoomType.hasMany(Room, { foreignKey: 'room_type_id', as: 'rooms' });
Room.belongsTo(RoomType, { foreignKey: 'room_type_id', as: 'roomType' });

module.exports = { sequelize, Sequelize, User, RoomType, Room, Guest };
