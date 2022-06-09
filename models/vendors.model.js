const Sequelize = require("sequelize");
const sequelize = require("../util/db-util");

const Vendor = sequelize.define("Vendor", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  websiteUrl: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
});
module.exports = Vendor;
