const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        parentId: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("chats", ChatSchema);
