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
router.post("/:id/info", restaurantController.generateQrcode);
router.get("/:id/qrinfo", restaurantController.qrinfo);
router.get("/:id/didvc", restaurantController.didvc);

module.exports = router;
