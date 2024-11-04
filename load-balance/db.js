// load-balance/sequelize.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize(process.env.DATABASE_URL,{dialect: 'mysql'});

module.exports = sequelize;