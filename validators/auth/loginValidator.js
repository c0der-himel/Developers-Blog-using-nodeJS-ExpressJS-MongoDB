const { body } = require('express-validator');

const loginValidator = [
  body('email').not().isEmpty().withMessage('Email can not be empty'),
  body('password').not().isEmpty().withMessage('Password can not be empty'),
];

module.exports = loginValidator;
