const { Sequelize } = require('sequelize');
const path = require('path');

// Always use SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'), // Path to SQLite database file
  logging: false,
});

module.exports = sequelize;
