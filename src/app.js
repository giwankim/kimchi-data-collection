const path = require("path");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = require("./src/db");

const PORT = process.env.PORT || 3000;

// express server
const app = express();

// server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/restaurant", (req, res) => {
  res.render("restaurant");
});

app.get("/manufacturer", (req, res) => {
  res.send("manufacturer page");
});

app.get("/admin", (req, res) => {
  const sql = "SELECT * FROM Restaurant ORDER BY id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.render("admin", { model: rows });
  });
});

// GET /edit/5
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Restaurant where id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.render("edit", { model: row });
  });
});

// POST /edit/5
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  // const body = req.body;
  // const restaurant = [
  //   body.name,
  //   body.zip,
  //   body.address,
  //   body.detail_address,
  //   body.extra_address,
  //   body.brand,
  //   body.area,
  //   body.consumption,
  //   body.approved,
  //   id,
  // ];
  const {
    name,
    zip,
    address,
    detail_address,
    extra_address,
    brand,
    area,
    consumption,
    approved,
  } = body;
  const restaurant = [
    name,
    zip,
    address,
    detail_address,
    extra_address,
    brand,
    area,
    consumption,
    approved,
    id,
  ];
  const sql =
    "UPDATE Restaurant SET name = ?, zip = ?, address = ?, detail_address = ?, extra_address = ?, brand = ?, area = ?, consumption = ?, approved = ? WHERE (id = ?)";
  db.run(sql, restaurant, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.redirect("restaurant");
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT} (http://localhost:3000)`);
});
