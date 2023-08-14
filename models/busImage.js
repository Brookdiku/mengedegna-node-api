module.exports = (sequelize, DataTypes) => {
    const BusImage = sequelize.define('busImage', {
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });
    return BusImage;
}
