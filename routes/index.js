const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const vendors = require("./vendor.route");
const login = require("./login.routes");

router.use("/user", user);
router.use("/vendors", vendors);

module.exports = router;
