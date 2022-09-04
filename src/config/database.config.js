require("dotenv").config();
const mongoose = require("mongoose");
const User = require('../models/auth');
const shortId = require('shortid');
const { ADMIN_CREDENTIALS } = require("./admin_crendentials");

function connect(callback) {
  try {
    mongoose
      .connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        User.findOne({ email: process.env.ADMIN_EMAIL }).exec((err, admin) => {
          if (err) return console.log('err', err);
          if (admin) {
            console.log('database is connected');
            callback();
          } else {
            const username = shortId.generate();
            // register new admin
            const newAdmin = new User({
              username,
              ...ADMIN_CREDENTIALS()
            });
            newAdmin.save((err, result) => {
              if (err) {
                console.log("Error saving admin in database. Try later");
              }
              console.log("Admin created");
              console.log('database is connected');
              callback();
            });
          }
        })
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.error(error);
  }
}

function close() {
  mongoose.close();
}

module.exports = {
  connect,
  close,
};
