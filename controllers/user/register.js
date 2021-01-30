const
  bcrypt = require('bcrypt'),
  {common400} = require('..'),
  User = require('../../models/user');

module.exports = async (req, res) => {
  const {name, email, password, password2} = req.body;

  if (!name || !email || !password || !password2) {
    return common400(res, 'Please fill in all fields');
  }

  if (password !== password2) {
    return common400(res, 'Passwords dont match');
  }

  if (password.length < 6) {
    return common400(res, 'Password at least 6 characters');
  }

  return await User.findOne({email}).exec(async (err, user) => {
    if (user) {
      return common400(res, 'Email already registered');
    }
    const newObj = new User({name, email, password});
    let result;
    try {
      let
        salt = await bcrypt.genSalt(10),
        hash = await bcrypt.hash(newObj.password, salt);
      newObj.password = hash;
      result = await newObj.save();
    } catch (e) {
      return common400(res, e);
    }
    res.send(result);
  });
};
