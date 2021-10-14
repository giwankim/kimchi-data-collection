const db = require("../config/database");

exports.index = (req, res) => {
  res.render("index");
};

exports.about = (req, res) => {
  res.render("about");
};

exports.restaurant = (req, res) => {
  res.render("restaurant");
};

exports.manufacturer = (req, res) => {
  res.render("manufacturer");
};

exports.admin = (req, res) => {
  const sql = "SELECT * FROM Restaurant ORDER BY id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.render("admin", { model: rows });
  });
};
