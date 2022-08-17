const User = require('../models/auth');

exports.getAllUsers = (req, res) => {
    User.find({}).populate('projects', 'projectName status category images updatedAt createdAt').exec(async (err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: 'Users not found',
                code: 0
            });
        }
        return res.json({
            data: users,
            code: 1
        });
    });
};

exports.getUser = (req, res) => {
    const { _id } = req.body;
    User.findOne({ _id }).populate('projects', 'projectName status category images updatedAt createdAt').exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found',
                code: 0
            });
        }
        return res.json({
            data: user,
            code: 1
        });
    });
};

exports.updateUser = (req, res) => {
    const { _id } = req.body;
    User.findOneAndUpdate({ _id }, req.body).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Error updating user. Try later',
                code: 0
            });
        }
        return res.json({
            message: 'User edited successfully.',
            data: user,
            code: 1
        });
    });
};

