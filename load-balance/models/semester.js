// models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the User model
const Semester = sequelize.define('Semester', {
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
    start_date: {
        type: DataTypes.DATEONLY,
    },
    end_date: {
        type: DataTypes.DATEONLY,
    },
    total_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'semesters',
});

module.exports = Semester;