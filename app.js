// require("dotenv").config({ path: "./envs/.env.dev" });
require('dotenv').config({ path: './envs/.env.prod' });
const path = require('path');
const express = require('express');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const manufacturerRouter = require('./routes/manufacturer');
const restaurantRouter = require('./routes/restaurant');
const usersRouter = require('./routes/users');
const auth = require('./middleware/auth');

// passport config
require('./config/passport')(passport);

let { MONGO_URI, PORT } = process.env;

// connect to DB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${MONGO_URI}`);
  });

// express
const app = express();

// session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30,
      ephemeral: true,
    },
  }),
);

// middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// routes
app.use('/users', usersRouter);
app.use('/restaurant', auth.ensureAuthenticated, restaurantRouter);
app.use('/manufacturer', auth.ensureAuthenticated, manufacturerRouter);
app.use('/', auth.ensureAuthenticated, indexRouter);

// error handling
app.use((req, res) => {
  res.render('notfound');
});

// server
PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
