const
  express = require('express'),
  router = express.Router(),
  {
    login,
    logout,
    me,
    register
  } = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);

module.exports  = router;
