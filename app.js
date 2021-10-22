require("dotenv").config({ path: "./envs/.env.development" });
// require("dotenv").config({ path: "./envs/.env.production" });
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

/**
 * TODO: delete after separating routes
 */
const indexRouter = require("./routes/index");
const createRouter = require("./routes/create");
const updateRouter = require("./routes/update");
const deleteRouter = require("./routes/delete");
const approveRouter = require("./routes/approve");

const manufacturerRouter = require("./routes/manufacturer");
const restaurantRouter = require("./routes/restaurant");

/**
 * TODO: delete when done migrating to MongoDB
 */
const db = require("./config/database");

// Connect to DB
mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB...");
  });

// Express server
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", indexRouter);
app.use("/restaurant", restaurantRouter);
app.use("/manufacturer", restaurantRouter);

/**
 * TODO: refactor into restaurant and manufacturer routes
 */
app.use("/create", createRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);
app.use("/approve", approveRouter);

// Error page
app.use((req, res) => {
  res.render("notfound");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
