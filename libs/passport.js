/*eslint no-underscore-dangle: 0*/
const
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  User = require('../models/user');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {usernameField: 'email'},
      async (email, password, done) => {
        let user = await User.findOne({email});
        if (!user) {
          return done(null, false, {message: 'Incorrect username'});
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
