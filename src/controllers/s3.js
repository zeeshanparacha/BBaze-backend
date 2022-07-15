const { S3, ListObjectsCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
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
exports.S3Multer = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        key: function (req, file, cb) {
            let _file = file.originalname;
            let prefix = req?.url?.split("/").pop();
            let fullPath = `${prefix}/${_file}`;
            cb(null, fullPath)
        }
    })
}).single('file')


// Download File from S3
exports.downloadFile = async (filename) => {
    try {
        const res = await s3.getObject({ Bucket: BUCKET_NAME, Key: filename }).promise();
        return { success: true, data: res.Body }
    } catch (error) {
        return { success: false, data: null }
    }
}

// Delete File from S3
exports.deleteFile = async (req, res) => {
    const filename = req.params.filename;
    const prefix = req?.url?.split("/")?.slice(2, 3)[0] + '/';
    const key = prefix + filename;
    try {
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        return res.json({ code: 1, message: "File deleted successfully." });
    } catch (err) {
        return res.status(500).json({
            error: 'Could not delete file. Try later',
            code: 0,
            ms: err
        })
    }
}

// List All Files from S3
exports.listFiles = async (req, res) => {
    let prefix = req?.url?.split("/").pop();

    if (!prefix) return res.status(404).json({
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
        return res.status(500).json({
            error: 'Error fetching objects from bucket. Try later',
            code: 0,
        });
    }
}
exports.upload = (req, res) => {
    if (!req.file.location) {
        return res.status(500).json({
            error: 'Unable to upload file. Try later',
            code: 0,
            data: null
        });
    }
    return res.json({
        message: 'File has been uploaded successfully.',
        code: 1,
        data: req.file.location
    });
};