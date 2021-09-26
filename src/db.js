const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// connect to db
const db_name = path.join(__dirname, "..", "data", "restaurant.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to the database 'restaurant.db'");
});

// create table
const sql_create = `CREATE TABLE IF NOT EXISTS Restaurant (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  address VARCHAR(100) NOT NULL,
  detail_address VARCHAR(100) NOT NULL,
  extra_address TEXT,
  brand VARCHAR(100) NOT NULL,
  area REAL NOT NULL,
  consumption REAL,
  approved BOOLEAN
);`;
db.run(sql_create, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Created table 'Restaurant'");

  // populate db with dummy data
  const sql_insert = `INSERT INTO Restaurant (id, name, zip, address, detail_address, extra_address, brand, area, consumption, approved) VALUES
    (1, '음식점1', '63309', '제주특별자치도 제주시 첨단로 242', '3층', '지하실', '종가집', 123.45, 1000.5, 'false'),
    (2, '음식점2', '12345', '도로 한복판', '1층', '옥탑방', 'CJ 푸드', 543.21, 50.1, 'false'),
    (3, 'restaurant', '90210', 'road address', 'detailed address', 'extra address', 'brand', 12.345, 111, 'false');`;
  db.run(sql_insert, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Inserted dummy data");
  });
});

module.exports = db;
