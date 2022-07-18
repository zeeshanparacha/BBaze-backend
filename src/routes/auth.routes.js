module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const { login, register } = require("../controllers/auth");
  const { userRegisterValidator, userLoginValidator } = require('../validators/auth');
  const { runValidation } = require('../validators');

  router.post('/login', userLoginValidator, runValidation, login);
  router.post('/register', userRegisterValidator, runValidation, register);

  app.use("/security", router);
};
