const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require("./event.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);

db.users = require("./user.model.js")(sequelize, Sequelize);
db.items.belongsTo(db.users);

db.events.hasMany(db.items, { as: "items" });
db.items.belongsTo(db.events, {
  foreignKey: "eventId",
  as: "event",
});

module.exports = db;
