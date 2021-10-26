const express = require("express");
const indexController = require("../controllers/index.controller");

const router = express.Router();

router.get("/", indexController.index);
router.get("/about", indexController.about);
router.get("/restaurant", indexController.restaurant);
router.get("/manufacturer", indexController.manufacturer);
router.get("/admin", indexController.admin);
router.get("/info", indexController.info);

module.exports = router;
