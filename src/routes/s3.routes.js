module.exports = function (app) {
    const express = require("express");
    const router = express.Router();
    const { requireSignin, authenticate } = require("../controllers/auth");
    const { S3Multer, deleteFile, listFiles, upload, s3ProfileMulter } = require("../controllers/s3");
    // List All docs from S3
    router.post('/bucket/files', requireSignin, authenticate, S3Multer, listFiles);

    // List All Images from S3
    router.post('/bucket/images', requireSignin, authenticate, S3Multer, listFiles);

    // Upload image to S3
    router.post('/upload/images', requireSignin, authenticate, S3Multer, upload);

    // Upload File to S3
    router.post('/upload/files', requireSignin, authenticate, S3Multer, upload);

    // Delete File from S3
    router.post('/delete/files', requireSignin, authenticate, S3Multer, deleteFile);

    // Delete image from S3
    router.post('/delete/images', requireSignin, authenticate, S3Multer, deleteFile);

    // Upload profile image to S3
    router.post('/upload/profile', requireSignin, authenticate, s3ProfileMulter, upload);

    app.use("/s3", router);
};
