const db_config = require("../config/db_config")
const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(
    db_config.DB,
    db_config.USER,
    db_config.PASSWORD, {
    host: db_config.HOST,
    dialect: db_config.DIALECT,
    pool: {
        max: db_config.pool.MAX,
        min: db_config.pool.MIN,
        acquire: db_config.pool.acquire,
        idle: db_config.pool.idle
    }
}
)
sequelize.authenticate().then(() => {
    console.log("connected...");

}).catch((error) => {
    console.log("unable to connect" + error);

})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require("./user")(sequelize, DataTypes)
db.buses = require("./bus")(sequelize, DataTypes)
db.busImages = require("./busImage")(sequelize, DataTypes)
db.sequelize.sync({ force: false }).then(() => {
    console.log("resync-done.");
})
db.buses.hasMany(db.busImages, {
    onDelete: 'CASCADE',
    foreignKey: 'bus_id',
    as:'busImage',
    
})
db.busImages.belongsTo(db.buses, {
    foreignKey: 'bus_id',
    as:'bus'
})
module.exports = db;