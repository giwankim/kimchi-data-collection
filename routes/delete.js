const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/:id", adminController.deleteGet);

router.post("/:id", adminController.deletePost);

module.exports = router;
