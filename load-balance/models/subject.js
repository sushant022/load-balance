// models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const Semester = require('./semester');
const sequelize = require('../db');

// Define the User model
const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        allowEmpty: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    total_theory_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_practical_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    theory_hours_per_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    practical_hours_per_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    division_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    batch_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    semester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
},{
    tableName: 'subjects',
});

Subject.belongsTo(Semester, { foreignKey: 'semester_id' });
Semester.hasMany(Subject, { foreignKey: 'semester_id' });
module.exports = Subject;