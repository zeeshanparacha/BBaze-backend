module.exports = function (app) {
    const express = require("express");
    const router = express.Router();
    const { requireSignin, authenticate } = require("../controllers/auth");
    const { S3Multer, downloadFile, deleteFile, listFiles, upload } = require("../controllers/s3");
    app.use(S3Multer);
    // List All docs from S3
    router.get('/bucket/files', requireSignin, authenticate, listFiles);

    // List All Images from S3
    router.get('/bucket/images', requireSignin, authenticate, listFiles);

    // Upload image to S3
    router.post('/upload/images', requireSignin, authenticate, upload);

    // Upload File to S3
    router.post('/upload/files', requireSignin, authenticate, upload);

    // Delete File from S3
    router.delete('/delete/files/:filename', deleteFile);

    // Delete image from S3
    router.delete('/delete/images/:filename', deleteFile);

    app.use("/s3", router);
};
