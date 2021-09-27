const path = require("path");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = require("./db");

const PORT = process.env.PORT || 3000;

// Express server
const app = express();

// Server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT} (http://localhost:3000)`);
});

// Routes
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
});

// GET /create
// app.get("/create", (req, res) => {
//   res.render("create", { model: {} });
// });

// POST /create
app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO Restaurant (name, postcode, address, detail_address, type, brand, area, consumption, approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'false');";
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
  ];
  db.run(sql, restaurant, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.redirect("/");
  });
});

// GET /delete/5
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Restaurant WHERE id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.render("delete", { model: row });
  });
});

// POST /delete/5
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Restaurant WHERE id = ?";
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.redirect("/admin");
  });
});

// GET /approve/5
app.get("/approve/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Restaurant WHERE id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.render("approve", { model: row });
  });
});

// POST /approve/5
app.post("/approve/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE Restaurant SET approved = 'true' WHERE id = ?";
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    res.redirect("/admin");
  });
});
