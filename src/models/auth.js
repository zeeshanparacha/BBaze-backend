const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 12,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "organizer"
    },
    salt: String,
    profile: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
    },
    profession: {
      type: String,
    },
    town: {
      type: String,
    },
    expertiseFeild: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    telephone: {
      type: String,
    },
    fax: {
      type: String,
    },
    about: {
      type: String,
    },
    loginName: {
      type: String,
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
    resetPasswordLink: { type: String, }
  },
  { timestamps: true }
);

// virtual fields
userSchema
  .virtual("password")
  .set(function (password) {
    // create temp variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods > authenticate, encryptPassword, makeSalt
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },

};
// export user model

module.exports = mongoose.model("User", userSchema);
