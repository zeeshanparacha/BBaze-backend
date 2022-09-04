const User = require('../models/auth');
const JWT = require('jsonwebtoken');
var { expressjwt: expressjwt } = require("express-JWT");
const shortId = require('shortid');
const AWS = require("aws-sdk");
const { resetPasswordParams } = require("../helper/email")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})
const SES = new AWS.SES({ apiVersion: "2010-12-01" })

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

exports.forgetPassword = (req, res) => {
  const { email } = req.body;
  //check if user does not exist in database
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) return res.status(400).json({
      error: "We could not verify your email, please try again!",
      code: 0
    })

    //generate token with email
    const token = JWT.sign({ email }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m'
    })
    user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: 'Password reset failed. Try later.',
          code: 0
        });
      }
      //send email
      const params = resetPasswordParams(email, user.name, token)
      const sendEmail = SES.sendEmail(params).promise();
      sendEmail
        .then(response => {
          res.json({
            code: 1,
            message: `Email has been sent to ${email}, Follow the instructions to reset your password`
          })
        })
        .catch(error => {
          res.json({
            error: `We could not verify your email, please try again! ${error}`,
            code: 0
          })
        })
    })
  })
}

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    // check for expiry
    JWT.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: 'Your link has been expired, Try resetting your password again.',
          code: 0
        });
      }

      User.findOne({ resetPasswordLink }).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Invalid token. Try again',
            code: 0
          });
        }

        user.password = newPassword
        user.resetPasswordLink = ""

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: 'Password reset failed. Try again',
              code: 0
            });
          }

          res.json({
            message: `Your password has been reset, Please login with your new password`,
            code: 1
          });
        });
      });
    });
  }
};

exports.requireSignin = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }); // req.user

exports.authenticate = (err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Your token is expired, please login again.',
      code: 0
    });
  }
  next()
}
