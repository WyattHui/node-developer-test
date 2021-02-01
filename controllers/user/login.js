const
  passport = require('passport'),
  {postHandleUser} = require('./common');

module.exports = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (info) {
      res.status(401);
      return res.send(info);
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }

      return res.send(postHandleUser(user));
    });

  })(req, res, next);
};
