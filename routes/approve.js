const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/:id", adminController.approveGet);

router.post("/:id", adminController.approvePost);

module.exports = router;
