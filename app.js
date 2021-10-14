const express = require("express");
const path = require("path");
const db = require("./config/database");
const indexRouter = require("./routes/index");
const createRouter = require("./routes/create");
const updateRouter = require("./routes/update");
const deleteRouter = require("./routes/delete");
const approveRouter = require("./routes/approve");

// Express server
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", indexRouter);
app.use("/create", createRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);
app.use("/approve", approveRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT} (http://localhost:3000)`);
});
