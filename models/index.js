const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const User = require('./User')(sequelize);

module.exports = { sequelize, Sequelize, User };