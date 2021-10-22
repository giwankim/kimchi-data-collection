const Manufacturer = require("../models/Manufacturer");

exports.createManufacturer = (req, res) => {
  const { name, postcode, address, detailAddress, production } = req.body;
  const manufacturer = {
    name,
    postcode,
    address,
    detail_address: detailAddress,
    production,
  };
  res.render("confirm-manufacturer", { model: manufacturer });
};

exports.createManufacturerConfirm = async (req, res) => {
  try {
    const { name, postcode, address, detailAddress, production } = req.body;
    const manufacturer = await Manufacturer.create({
      name,
      postcode,
      address,
      detail_address: detailAddress,
      production,
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    res.render("edit-manufacturer", { model: manufacturer });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateManufacturerConfirm = async (req, res) => {
  try {
    const manufacturer = {
      ...req.body,
      detail_address: req.body.detailAddress,
    };
    await Manufacturer.findByIdAndUpdate(req.params.id, manufacturer);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    res.render("delete", { model: manufacturer });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteManufacturerConfirm = async (req, res) => {
  try {
    await Manufacturer.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.approveManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    res.render("approve-manufacturer", { model: manufacturer });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.approveManufacturerConfirm = async (req, res) => {
  try {
    await Manufacturer.findByIdAndUpdate(req.params.id, { approved: true });
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send(err);
  }
};
