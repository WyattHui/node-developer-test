const
  express = require('express'),
  pjson = require('./package.json'),
  router = express.Router();

router.get('/ping', (req, res) => {
  res.send();
});
router.get('/version', (req, res) => {
  res.send(pjson.version);
});

module.exports = router;
