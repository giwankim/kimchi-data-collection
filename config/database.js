const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Connect to database
const db_name = path.join(__dirname, "..", "data", "restaurant.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to 'restaurant.db'");
});

// Create table
const sql_create = `CREATE TABLE IF NOT EXISTS Restaurant (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  postcode TEXT NOT NULL,
  address TEXT NOT NULL,
  detail_address TEXT NOT NULL,
  type TEXT NOT NULL,
  brand TEXT NOT NULL,
  area REAL NOT NULL,
  consumption REAL,
  approved BOOLEAN NOT NULL
);`;

db.run(sql_create, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Created table 'Restaurant'");

  // populate database with test data
  const sql_insert = `INSERT INTO Restaurant (id, name, postcode, address, detail_address, type, brand, area, consumption, approved) VALUES
    (1, '음식점1', '1', '광주 광산구 명도동 1', '1층', '한식', '브랜드1', 11.111, 111.1, 'false'),
    (2, '음식점2', '2', '광주시 광산구 명도동 2', '2층', '양식', '브랜드2', 22.222, 2.22, 'false'),
    (3, '음식점3', '3', '광주시 광산구 명도동 3', '3층', '일식', '브랜드3', 33.333, 3.3, 'false'),
    (4, '음식점4', '4', '광주시 광산구 명도동 4', '4층', '분식', '브랜드4', 4.44, 444.4, 'false'),
    (5, '음식점5', '5', '광주시 광산구 명도동 5', '5층', '기타', '브랜드5', 555.5, 5.55, 'false'),
    (6, '음식점6', '6', '광주시 광산구 명도동 6', '6층', '한식', '브랜드6', 6.6, 66.6, 'false'),
    (7, '음식점7', '7', '광주시 광산구 명도동 7', '7층', '양식', '브랜드7', 0.77, 777.7, 'false');`;
  db.run(sql_insert, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Inserted dummy data");
  });
});

module.exports = db;
