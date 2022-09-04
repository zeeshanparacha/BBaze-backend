module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const { login, forgetPassword, resetPassword } = require("../controllers/auth");
  const { userLoginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth');
  const { runValidation } = require('../validators');

  router.post('/login', userLoginValidator, runValidation, login);
  router.post('/generate-password-token', forgotPasswordValidator, runValidation, forgetPassword);
  router.post('/reset-password', resetPasswordValidator, runValidation, resetPassword);

  app.use("/security", router);
};
