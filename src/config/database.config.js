require("dotenv").config();
const mongoose = require("mongoose");
const User = require('../models/auth');
const shortId = require('shortid');

function connect(callback) {
  try {
    mongoose
      .connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        User.findOne({ email: process.env.ADMIN_EMAIL }).exec((err, admin) => {
          if (err) return console.log('123', err);
          if (admin) {
            callback();
          } else {
            const username = shortId.generate();
            // register new admin
            const newAdmin = new User({
              username,
              "email": process.env.ADMIN_EMAIL,
              "loginName": "tresor",
              "password": "123456",
              "name": "Tresor Matonde",
              "profession": "Contracter",
              "telephone": "+942 411 412",
              "mobileNumber": "+942 411 412",
              "expertiseFeild": "Contracter",
              "town": "USA",
              "profile": "",
              "fax": "0900",
              "about": "A US based professional.",
              "role": "admin"
            });
            newAdmin.save((err, result) => {
              if (err) {
                console.log("Error saving admin in database. Try later");
              }
              console.log("Admin created");
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
