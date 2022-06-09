const express = require("express");
const controller = require("../controllers/user.controller");
const router = express.Router();
router.route("/:id").get(controller.get);
router.route("/").get(controller.getAll);
router.post("/signup", controller.validate, controller.signup);
// router.route("/signup").post(controller.validate,controller.signup);
router.route("/:id").put(controller.update);
module.exports = router;
