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
  // Create restaurant document
  try {
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
    const qrImg = await qr.toDataURL(url);
    res.render("scan", { qrImg });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("edit", { model: restaurant });
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.updateRestaurantConfirm = async (req, res) => {
  try {
    const restaurant = {
      ...req.body,
      detail_address: req.body.detailAddress,
    };
    await Restaurant.findByIdAndUpdate(req.params.id, restaurant);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("delete", { model: restaurant });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteRestaurantConfirm = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.approveRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("approve", { model: restaurant });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.approveRestaurantConfirm = async (req, res) => {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, { approved: true });
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err);
  }
};
