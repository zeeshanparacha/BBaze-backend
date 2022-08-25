const Chat = require('../models/chat');
const { ObjectId } = require('mongodb');

exports.addMessage = (req, res) => {
    const Message = new Chat({ ...req.body });
    Message.save((err, result) => {
        if (err) {
            return res.status(401).json({
                error: 'Error saving message in database. Try later',
                code: 0
            });
        }
        return res.json({
            message: 'Message added to project.',
            result,
            code: 1
        });
    });
}

exports.getMessages = (req, res) => {
    const { projectId } = req.body;
    Chat.find({ projectId }).populate('user').exec(async (err, messages) => {
        if (err || !messages) {
            return res.status(400).json({
                error: 'Chat not found',
                code: 0
            });
        }
        let construct = messages.filter(item => item.parentId === null).map((message) => {
            let parentId = message._id;
            return {
                ...constructMessages(message),
                replies: messages.filter(key => key.parentId && key.parentId == parentId).map((replies) => {
                    return {
                        ...constructMessages(replies),
                    }
                })
            }
        })

        return res.json({
            data: construct,
            code: 1
        });
    });
};

const constructMessages = (message) => {
    return {
        _id: message._id,
        parentId: message.parentId,
        projectId: message.projectId,
        message: message.message,
        user: { name: message.user.name, profile: message.user.profile },
    }
}
