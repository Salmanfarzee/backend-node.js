const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const vendors = require("./vendor.route");

router.use("/user", user);
router.use("/vendors", vendors);
module.exports = router;
