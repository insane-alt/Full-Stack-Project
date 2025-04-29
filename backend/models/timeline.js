const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./project.js'); // Fix: Add .js extension

const Timeline = sequelize.define('Timeline', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Projects',
            key: 'id'
        }
    },
    event: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

// Define associations
Timeline.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = Timeline;
