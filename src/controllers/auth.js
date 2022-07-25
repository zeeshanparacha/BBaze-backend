const User = require('../models/auth');
const JWT = require('jsonwebtoken');
var { expressjwt: expressjwt } = require("express-jwt");
const shortId = require('shortid');
const _ = require('lodash');

exports.register = (req, res) => {
  const email = req.body.email;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken',
        code: 0
      });
    }
    const username = shortId.generate();
    // register new user
    const newUser = new User({ username, ...req.body });
    newUser.save((err, result) => {
      if (err) {
        return res.status(401).json({
          error: 'Error saving user in database. Try later',
          code: 0
        });
      }
      return res.json({
        message: 'Registration success. Please login.',
        result,
        code: 1
      });
    });
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec(async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please register.',
        code: 0
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match',
        code: 0
      });
    }

    // generate token and send to client
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    return res.json({
      token,
      user,
      code: 1
    });
  })
};

exports.getAllUsers = (req, res) => {
  User.find({}).exec(async (err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: 'Users not found',
        code: 0
      });
    }
    return res.json({
      data: users,
      code: 1
    });
  });
};

exports.requireSignin = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }); // req.user

exports.authenticate = (err, _, res, next) => {
  // if (err.name === 'UnauthorizedError') {
  //   return res.status(401).json({
  //     error: 'Your token is expired, please login again.',
  //     code: 0
  //   });
  // }
  next()
}
