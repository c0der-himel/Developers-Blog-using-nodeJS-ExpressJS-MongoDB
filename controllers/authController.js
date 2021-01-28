const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const errorFormatter = require('../utils/validationErrorFormatter');

exports.signupGetController = (req, res, next) => {
  res.render('pages/auth/signup', {
    title: 'Create Account',
    error: {},
    value: {},
  });
};

exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.render('pages/auth/signup', {
      title: 'Create Account',
      error: errors.mapped(),
      value: {
        username,
        email,
        password,
      },
    });
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 11);
    let user = new User({
      username,
      email,
      password: hashedPassword,
    });
    let createdUser = await user.save();

    console.log('User Created Successfully', createdUser);
    res.render('pages/auth/signup', { title: 'Create Account' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.loginGetController = (req, res, next) => {
  res.render('pages/auth/login', {
    title: 'Login to Account',
    error: {},
    value: {},
  });
};

exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.render('pages/auth/login', {
      title: 'Login Account',
      error: errors.mapped(),
      value: { email },
    });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid Credential', user);
      return res.json({
        message: 'Invalid Credential',
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Invalid Credential', user);
      return res.json({
        message: 'Invalid Credential',
      });
    }

    console.log('Successfully Logged In', user);
    res.render('pages/auth/login', { title: 'Login to Account' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.logoutController = (req, res, next) => {};
