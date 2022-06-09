const express = require("express");
const router = express.Router();
const controller = require("../controllers/vendor.controller");

router.route("/").get(controller.getAll);
router.route("/:id").get(controller.get);
router.route("/").post(controller.create);
router.route("/:id").put(controller.update);
module.exports = router;
