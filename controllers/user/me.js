const {postHandleUser} = require('./common');

module.exports = (req, res) => {
  return res.send(postHandleUser(req.user));
};
