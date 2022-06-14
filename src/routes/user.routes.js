module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const { login } = require("../controllers/user");

  router.get("/login", login);
  app.use("/security", router);
};
