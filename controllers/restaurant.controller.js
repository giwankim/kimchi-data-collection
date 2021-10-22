const qr = require("qrcode");
const Restaurant = require("../models/Restaurant");

exports.createRestaurant = (req, res) => {
  const {
    name,
    postcode,
    address,
    detailAddress,
    cuisine,
    brand,
    area,
    consumption,
  } = req.body;
  const restaurant = {
    name,
    postcode,
    address,
    detail_address: detailAddress,
    cuisine,
    brand,
    area,
    consumption,
  };
  res.render("confirm", { model: restaurant });
};

exports.createRestaurantConfirm = async (req, res) => {
  const {
    name,
    postcode,
    address,
    detailAddress,
    cuisine,
    brand,
    area,
    consumption,
  } = req.body;
  const restaurant = await Restaurant.create({
    name,
    postcode,
    address,
    detail_address: detailAddress,
    cuisine,
    brand,
    area,
    consumption,
  });

  // Generate QR code
  const url = `https://www.futuresense.co.kr/kimchi/${restaurant._id}`;
  qr.toDataURL(url, (err, qrImg) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render("scan", { qrImg });
  });
};

exports.updateRestaurantGet = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("edit", { model: restaurant });
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.updateRestaurantPost = async (req, res) => {};

exports.deleteRestaurant = (req, res) => {};

exports.deleteRestaurantConfirm = async (req, res) => {};
