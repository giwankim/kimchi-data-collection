// require("dotenv").config({ path: "./envs/.env.development" });
require("dotenv").config({ path: "./envs/.env.production" });
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const manufacturerRouter = require("./routes/manufacturer");
const restaurantRouter = require("./routes/restaurant");

let { MONGO_URI, PORT } = process.env;

// Connect to DB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${MONGO_URI}`);
  });

// Express
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
app.use("/manufacturer", manufacturerRouter);
// Error page
app.use((req, res) => {
  res.render("notfound");
});

// Server
PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
