const Sequelize = require("sequelize");

const sequelize = new Sequelize("task", "root", "root", {
  logging: false,

  dialect: "mysql",

  pool: {
    max: 25,

    min: 0,

    acquire: 30000,

    idle: 10000,
  },
});

module.exports = sequelize;
