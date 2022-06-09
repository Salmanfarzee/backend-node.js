const User = require("./user.model");
const Vendor = require("./vendors.model");
const sequelize = require("../util/db-util");

// sequelize.sync();
module.exports = {
  Vendor,
  User,
};
