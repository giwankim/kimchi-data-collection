const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/:id", adminController.updateGet);
router.post("/:id", adminController.updatePost);

module.exports = router;
