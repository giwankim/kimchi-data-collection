const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  }),
);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', '로그아웃 되었습니다');
  res.redirect('/users/login');
});

module.exports = router;
