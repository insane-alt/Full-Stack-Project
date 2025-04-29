const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      canManageUsers: true,
      canManageContent: true,
      canManageSettings: true
    }
  }
}, {
  timestamps: true
});

module.exports = Admin; 
