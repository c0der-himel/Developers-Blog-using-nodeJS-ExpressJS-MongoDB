const router = require('express').Router();

const signupValidator = require('../validators/auth/signupValidator');
const loginValidator = require('../validators/auth/loginValidator');

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require('../controllers/authController');

router.get('/signup', signupGetController);
router.post('/signup', signupValidator, signupPostController);
router.get('/login', loginGetController);
router.post('/login', loginValidator, loginPostController);
router.get('/logout', logoutController);

module.exports = router;
