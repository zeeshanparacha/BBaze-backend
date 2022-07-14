module.exports = function (app) {
    const express = require("express");
    const router = express.Router();
    const { requireSignin, authenticate } = require("../controllers/auth");
    const { uploadFile, downloadFile, deleteFile, listFiles } = require("../controllers/s3");

    // List All docs from S3
    router.get('/bucket/files', requireSignin, authenticate, listFiles);

    // List All Images from S3
    router.get('/bucket/images', requireSignin, authenticate, listFiles);

    // Upload image to S3
    router.post('/upload/images', requireSignin, authenticate, uploadFile.single('file'), async (req, res) => {
        return res.json({ success: true, data: req.file.location })
    });

    // Upload File to S3
    router.post('/upload/files', requireSignin, authenticate, uploadFile.single('file'), async (req, res) => {
        return res.json({ success: true, data: req.file.location })
    });

    // Download File from S3
    router.get('/download/:filename', async (req, res) => {
        const filename = req.params.filename
        const { success, data } = await downloadFile(filename)
        if (success) {
            return res.json({ success, data })
        }
        return res.status(500).json({ success: false, message: 'Error Occured !!!' })
    });

    // Delete File from S3
    router.delete('/delete/:filename', async (req, res) => {
        const filename = req.params.filename
        const { success, data } = await deleteFile(filename)
        if (success) {
            return res.json({ success, data })
        }
        return res.status(500).json({ success: false, message: 'Error Occured !!!' })
    });

    app.use("/s3", router);
};
