require("dotenv").config({ path: "./envs/.env.production" });
const { default: axios } = require("axios");
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

exports.didvc = async (req, res, next) => {
  try {
    const url = process.env.API_URL;
    const key = process.env.API_KEY;
    const id = req.params.id;

    const restaurant = await Restaurant.findById(id);

    const bodydata = {
      _id: id,

      manufacturer: "2d715b40-c85f-4595-b88e-c7fb9befd016",
      type_of_kimchi: "자가제조",
      composition: "국내제조",
      consumption_amount: Math.trunc(restaurant.consumption),

      name: restaurant.name,
      province: restaurant.detail_address,
      district: restaurant.detail_address,
      postal_code: restaurant.postcode,
      address: restaurant.address,
      cuisine: restaurant.cuisine,
      area: Math.trunc(restaurant.area),
    };

    axios
      .post(`${url}/v2/composite/restaurant`, bodydata, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      })
      .then((response) => {
        const { data } = response;
        const document = JSON.stringify(data.didDocument);
        const did = JSON.stringify(data.didDocument.id);
        const authVc = JSON.stringify(data.restaurantRegistration);
        const vc = JSON.stringify(data.restaurantConsumption);

        res.render("didvc", { restaurant, document, did, authVc, vc });
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/admin");
      });
  } catch (err) {
    next(err);
  }
};
