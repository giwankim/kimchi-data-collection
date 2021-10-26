const qr = require("qrcode");
const Restaurant = require("../models/restaurant.entity");

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

exports.createRestaurantConfirm = async (req, res, next) => {
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
    // const url = `https://www.futuresense.co.kr/kimchi/${restaurant._id}`;
    const url = `http://3.34.64.241/restaurant/${restaurant._id}/qrinfo`;
    const qrImg = await qr.toDataURL(url);
    res.render("scan", { qrImg });
  } catch (err) {
    next(err);
  }
};

exports.updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("edit", { model: restaurant });
  } catch (err) {
    next(err);
  }
};

exports.updateRestaurantConfirm = async (req, res, next) => {
  try {
    const restaurant = {
      ...req.body,
      detail_address: req.body.detailAddress,
    };
    await Restaurant.findByIdAndUpdate(req.params.id, restaurant);
    res.redirect("/admin");
  } catch (err) {
    next(err);
  }
};

exports.deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("delete", { model: restaurant });
  } catch (err) {
    next(err);
  }
};

exports.deleteRestaurantConfirm = async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    next(err);
  }
};

exports.approveRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("approve", { model: restaurant });
  } catch (err) {
    next(err);
  }
};

exports.approveRestaurantConfirm = async (req, res, next) => {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, { approved: true });
    res.redirect("/admin");
  } catch (err) {
    next(err);
  }
};

exports.generateQrcode = async (req, res, next) => {
  const url = `http://3.34.64.241/restaurant/${req.params.id}/qrinfo`; // hardcoded address
  qr.toDataURL(url, (err, qrImg) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(qrImg);
  });
};

exports.qrinfo = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("view-qrcode", { model: restaurant });
  } catch (err) {
    next(err);
  }
};

exports.getRestaurants = async (req, res, next) => {
  const perPage = 10;
  const page = req.params.page || 1;
  try {
    const restaurants = await Restaurant.find({});
    const totalCount = await Restaurant.count();
  } catch (err) {
    next(err);
  }
};
