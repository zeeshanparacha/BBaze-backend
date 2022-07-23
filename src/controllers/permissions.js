const Permissions = require('../models/permissions');
const { ObjectId } = require('mongodb');


exports.addUserToProject = (req, res) => {
    const { projectId, user } = req.body;
    Permissions.findOneAndUpdate({ projectId, user: ObjectId(user) }, req.body, { upsert: true, new: true, setDefaultsOnInsert: true }).exec(async (err, project) => {
        if (err || !project) {
            return res.status(400).json({
                error: 'Error adding user permissions to project. Try later',
                code: 0
            });
        }
        return res.json({
            message: 'User permissions added successfully.',
            data: project,
            code: 1
        });
    });
};



exports.getAllUsersPermissions = (req, res) => {
    const { projectId } = req.body;
    Permissions.find({ projectId }).populate('user').exec(async (err, permissions) => {
        if (err || !permissions) {
            return res.status(400).json({
                error: 'Permissions not found',
                code: 0
            });
        }
        return res.json({
            data: permissions,
            code: 1
        });
    });
};

exports.getUserPermissions = (req, res) => {
    const { projectId, user } = req.body;
    Permissions.findOne({ projectId, user: ObjectId(user) }).populate('user').exec(async (err, permissions) => {
        if (err || !permissions) {
            return res.status(400).json({
                error: 'Permissions not found',
                code: 0
            });
        }
        return res.json({
            data: permissions,
            code: 1
        });
    });
};

exports.deleteUserPermissions = (req, res) => {
    const { projectId, user } = req.body;
    Permissions.findOneAndDelete({ projectId, user: ObjectId(user) }).exec(async (err, project) => {
        if (err || !project) {
            return res.status(400).json({
                error: 'Error deleting user permissions to project. Try later',
                code: 0
            });
        }
        return res.json({
            message: 'User permissions deleted successfully.',
            code: 1
        });
    });
};