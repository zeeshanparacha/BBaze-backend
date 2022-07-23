module.exports = function (app) {
    const express = require("express");
    const router = express.Router();
    const { getAllUsers, getUser, updateUser } = require("../controllers/organization");
    const { register, } = require("../controllers/auth");
    const { requireSignin, authenticate } = require("../controllers/auth");
    const { userRegisterValidator, } = require('../validators/auth');
    const { runValidation } = require('../validators');

    router.post('/register', userRegisterValidator, runValidation, register);
    router.get('/users', requireSignin, authenticate, getAllUsers);
    router.post('/user', requireSignin, authenticate, getUser);
    router.post('/update-user', requireSignin, authenticate, updateUser);

    app.use("/organization", router);
};
