const express = require("express");
const restaurantController = require("../controllers/restaurant.controller");

const router = express.Router();

router.post("/", restaurantController.createRestaurant);
router.post("/confirm", restaurantController.createRestaurantConfirm);

module.exports = router;
