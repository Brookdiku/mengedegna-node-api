module.exports = (sequelize, DataTypes) => {
    const Bus = sequelize.define('bus', {
        plateNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        totalSeats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Bus;
}