// models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');

// Define the User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'users',
});

// Hash the password before saving the user
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Method to compare password
User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;