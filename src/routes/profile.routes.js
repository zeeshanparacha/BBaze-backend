module.exports = function (app) {
    const express = require("express");
    const router = express.Router();
    const { getUserProfile, updateUserProfile } = require("../controllers/profile");
    const { requireSignin, authenticate } = require("../controllers/auth");

    router.post('/get-profile', requireSignin, authenticate, getUserProfile);
    router.post('/update-profile', requireSignin, authenticate, updateUserProfile);

    app.use("/profile", router);
};
