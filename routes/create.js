const express = require("express");
const db = require("../config/database");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/", adminController.create);

router.post("/confirm", adminController.createConfirm);

module.exports = router;
