const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', '로그인하여 주십시오');
  res.redirect('/users/login');
};

const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin');
};

module.exports = { ensureAuthenticated, forwardAuthenticated };
