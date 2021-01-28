const { body } = require('express-validator');
const User = require('../../models/User');

const signupValidator = [
  body('username')
    .isLength({ min: 2, max: 15 })
    .withMessage('Username must be in between 2 to 15 characters')
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject('Username Already Used');
      }
    })
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please, provide a valid email')
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject('Email Already Used');
      }
    })
    .normalizeEmail(),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be greater than 5 characters'),
  body('confirmPassword')
    .isLength({ min: 5 })
    .withMessage('Password must be greater than 5 characters')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Password is not matching');
      }
      return true;
    }),
];

module.exports = signupValidator;
