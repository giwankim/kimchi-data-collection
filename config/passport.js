const LocalStrategy = require('passport-local').Strategy;
const users = require('./users');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      const user = users.find((user) => user.username === username);
      if (!user) {
        return done(null, false, { message: '등록된 아이디가 아닙니다' });
      }
      if (password === user.password) {
        return done(null, user);
      }
      return done(null, false, { message: '비밀번호가 일치하지 않습니다' });
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = users.find((user) => user.id === id);
    done(null, user);
  });
};
