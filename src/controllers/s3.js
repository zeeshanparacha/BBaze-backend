const { S3, ListObjectsCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');


const s3 = new S3({
    credentials: {
        accessKeyId: "AKIAWC4KYE2XR2IEYWXD",
        secretAccessKey: "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",
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET;

// Upload File to S3
const uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        prefix: function (req, file, cb) {
            cb(null, req.prefix)
        },
        key: function (req, file, cb) {
            let _file = file.originalname;
            let prefix = req?.url?.split("/").pop();
            let fullPath = `${prefix}/${_file}`;
            cb(null, fullPath)
        }
    })
})

// Download File from S3
const downloadFile = async (filename) => {
    try {
        const res = await s3.getObject({ Bucket: BUCKET_NAME, Key: filename }).promise();
        return { success: true, data: res.Body }
    } catch (error) {
        return { success: false, data: null }
    }
}

// Delete File from S3
const deleteFile = async (filename) => {
    try {
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: filename }).promise();
        return { success: true, data: "File deleted Successfully" }
    } catch (error) {
        return { success: false, data: null }
    }
}

// List All Files from S3
const listFiles = async (req, res) => {
    let prefix = req?.url?.split("/").pop();

    if (!prefix) return res.status(401).json({
        error: 'Could not found files.',
        code: 0,
    })

    try {
        const files = await s3.send(new ListObjectsCommand({ Bucket: BUCKET_NAME, Prefix: prefix }));
        const urls = files.Contents.filter(file => file.Size).map(file => `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`)
        return res.json({
            data: urls,
            code: 1
        });
    } catch (error) {
        return res.status(401).json({
            error: 'Error fetching objects from bucket. Try later',
            code: 0,
        });
    }
}

module.exports = {
    uploadFile,
    listFiles,
    downloadFile,
    deleteFile,
}