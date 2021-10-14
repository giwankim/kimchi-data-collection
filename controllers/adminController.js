const qr = require("qrcode");
const db = require("../config/database");

exports.create = (req, res) => {
  const {
    name,
    postcode,
    address,
    detailAddress,
    type,
    brand,
    area,
    consumption,
  } = req.body;
  const restaurant = {
    name,
    postcode,
    address,
    detail_address: detailAddress,
    type,
    brand,
    area,
    consumption,
  };
  res.render("confirm", { model: restaurant });
};

exports.createConfirm = (req, res) => {
  const sql =
    "INSERT INTO Restaurant (name, postcode, address, detail_address, type, brand, area, consumption, approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'false');";
  const {
    name,
    postcode,
    address,
    detailAddress,
    type,
    brand,
    area,
    consumption,
    approved,
  } = req.body;
  const restaurant = [
    name,
    postcode,
    address,
    detailAddress,
    type,
    brand,
    area,
    consumption,
    approved,
  ];
  db.run(sql, restaurant, function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
    // generate QR code
    const id = this.lastID;
    const url = `https://www.futuresense.co.kr/kimchi/${id}`;
    qr.toDataURL(url, (err, src) => {
      if (err) {
        console.error(err.message);
        return;
      }
      res.render("scan", { src });
    });
  });
};

exports.updateGet = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Restaurant WHERE id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render("edit", { model: row });
  });
};

exports.updatePost = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const restaurant = [
    body.name,
    body.postcode,
    body.address,
    body.detailAddress,
    body.type,
    body.brand,
    body.area,
    body.consumption,
    body.approved,
    id,
  ];
  const sql =
    "UPDATE Restaurant SET name = ?, postcode = ?, address = ?, detail_address = ?, type = ?, brand = ?, area = ?, consumption = ?, approved = ? WHERE (id = ?)";
  db.run(sql, restaurant, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.redirect("/admin");
  });
};

exports.deleteGet = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Restaurant WHERE id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.render("delete", { model: row });
  });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Restaurant WHERE id = ?";
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.redirect("/admin");
  });
};

exports.approveGet = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Restaurant WHERE id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.render("approve", { model: row });
  });
};

exports.approvePost = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE Restaurant SET approved = 'true' WHERE id = ?";
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.redirect("/admin");
  });
};
