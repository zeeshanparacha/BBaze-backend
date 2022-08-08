const { S3, ListObjectsCommand, DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Project = require('../models/projects');

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET;

// Upload File to S3
exports.S3Multer = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        key: function (req, file, cb) {
            let projectId = req.body.projectId
            let _file = file.originalname;
            let prefix = req?.url?.split("/").pop();
            let fullPath = `${projectId}/${prefix}/${_file}`;
            cb(null, fullPath)
        }
    })
}).single('file')

//upload-profile-multer
exports.s3ProfileMulter = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        key: function (req, file, cb) {
            let userId = req.body.userId
            let _file = file.originalname;
            let ext = _file.split(".").pop();
            let fullPath = `${userId}/image.${ext}`;
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
    const prefix = req?.url?.split("/").pop();
    const projectId = req.body.projectId;
    const filename = req.body.fileName;
    const fileId = req.body.fileId;
    const fileType = prefix === 'images' ? prefix : "documents";
    const key = `${projectId}/${prefix}/${filename}`;
    try {
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        Project.findOneAndUpdate({ _id: projectId }, { '$pull': { [fileType]: { '_id': fileId } } }, { new: true, multi: true })
            .exec((err, deleted) => {
                if (err || !deleted) {
                    return res.status(400).json({
                        error: 'Could not delete file. Try later',
                        code: 0
                    });
                }
                return res.status(200).json({
                    message: "Successfully deleted file",
                    code: 1
                })
            });
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
    let projectId = req.body.projectId;
    let path = `${projectId}/${prefix}/`

    if (!prefix) return res.status(404).json({
        error: 'Could not found files.',
        code: 0,
    })

    try {
        const files = await s3.send(new ListObjectsCommand({ Bucket: BUCKET_NAME, Prefix: path }));
        const urls = files.Contents.filter(file => file.Size)
            .map(file => `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`)
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
    if (!req?.file?.location) {
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

exports.createProjectBucket = async (projectId) => {
    try {
        await s3.send(new PutObjectCommand({ Bucket: BUCKET_NAME, Key: `${projectId}/files/` }));
        await s3.send(new PutObjectCommand({ Bucket: BUCKET_NAME, Key: `${projectId}/images/` }));
        return { code: 1, message: "Successfully created project bucket." }

    } catch (error) {
        return { code: 0, error: "Unable to create project bucket." }
    }
}