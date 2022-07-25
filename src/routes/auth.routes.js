module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const { login, } = require("../controllers/auth");
  const { userLoginValidator, } = require('../validators/auth');
  const { runValidation } = require('../validators');

  router.post('/login', userLoginValidator, runValidation, login);

  app.use("/security", router);
};
