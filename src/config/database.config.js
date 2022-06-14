const mongoose = require("mongoose");
require("dotenv").config();

function connect(callback) {
  try {
    mongoose
      .connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("db connected");
        callback();
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
