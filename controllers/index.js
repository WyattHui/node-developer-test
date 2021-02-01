module.exports = {
  common400: (res, err) => {
    err = err || {};
    res.status(400);
    res.send(err.message || err);
  }
};
