module.exports = function (app) {
    const express = require("express");
    const router = express.Router();
    const { requireSignin, authenticate } = require("../controllers/auth");
    const { addUserToProject, getAllUsersPermissions, getUserPermissions, deleteUserPermissions } = require("../controllers/permissions");

    router.post('/add-user', requireSignin, authenticate, addUserToProject);
    router.post('/get-all-users-permissions', requireSignin, authenticate, getAllUsersPermissions);
    router.post('/get-user-permissions', requireSignin, authenticate, getUserPermissions);
    router.post('/delete-user-from-project', requireSignin, authenticate, deleteUserPermissions);

    app.use("/permissions", router);
};
