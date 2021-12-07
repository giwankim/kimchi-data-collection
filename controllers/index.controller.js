const Restaurant = require('../models/restaurant.entity');
const Manufacturer = require('../models/manufacturer.entity');

exports.index = (req, res) => {
  res.render('index');
};

exports.about = (req, res) => {
  res.render('about');
};

exports.restaurant = (req, res) => {
  res.render('restaurant');
};

exports.manufacturer = (req, res) => {
  res.render('manufacturer');
};

exports.admin = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    const manufacturers = await Manufacturer.find({});
    res.render('admin', { model: { restaurants, manufacturers } });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.info = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.render('info', { model: { restaurants } });
  } catch (error) {
    res.status(500).send(error);
  }
};
