const express = require("express");
const restaurantController = require("../controllers/restaurant.controller");

const router = express.Router();

router.post("/", restaurantController.createRestaurant);
router.post("/confirm", restaurantController.createRestaurantConfirm);
router.get("/:id/update", restaurantController.updateRestaurant);
router.post("/:id/update", restaurantController.updateRestaurantConfirm);
router.get("/:id/delete", restaurantController.deleteRestaurant);
router.post("/:id/delete", restaurantController.deleteRestaurantConfirm);
router.get("/:id/approve", restaurantController.approveRestaurant);
router.post("/:id/approve", restaurantController.approveRestaurantConfirm);

module.exports = router;
