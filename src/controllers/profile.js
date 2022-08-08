const User = require('../models/auth');

exports.getUserProfile = (req, res) => {
    const { _id } = req.body;
    User.findOne({ _id }).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Profile not found',
                code: 0
            });
        }
        return res.json({
            data: user,
            code: 1
        });
    });
};

exports.updateUserProfile = (req, res) => {
    const { _id } = req.body;
    User.findOneAndUpdate({ _id }, req.body, { new: true }).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Error saving profile in database. Try later',
                code: 0
            });
        }
        return res.json({
            data: user,
            code: 1,
            message: 'Profile updated successfully.',
        });
    });
};


