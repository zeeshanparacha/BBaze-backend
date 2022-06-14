const db = require("./database.config");
const express = require("express");
const router = express.Router();

db.connect(() => {
  const app = require("./server");
  require("../routes/routes")(app);
});
