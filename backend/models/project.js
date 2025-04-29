const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  teamSize: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  projectObjectives: {
    type: DataTypes.TEXT
  },
  expectedOutcomes: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    defaultValue: 'Pending'
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  requiredSkills: {
    type: DataTypes.STRING
  },
  sdgs: {
    type: DataTypes.STRING
  },
  teamMembers: {
    type: DataTypes.STRING
  },
  mentors: {
    type: DataTypes.STRING
  },
  collaborators: {
    type: DataTypes.STRING
  },
  githubLink: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

// Set up associations
Project.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Project, { foreignKey: 'userId' });

module.exports = Project;
