var validate = require('validator');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            },
            unique: true
        },
        phoneNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            validate: {
                min: 12
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return User
}