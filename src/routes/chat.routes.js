module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const { addMessage, getMessages } = require("../controllers/chats");
  const { requireSignin, authenticate } = require("../controllers/auth");

  router.post("/add-message", requireSignin, authenticate, addMessage);
  router.post("/get-messages", requireSignin, authenticate, getMessages);

  app.use("/chat", router);
};
