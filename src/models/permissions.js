const mongoose = require("mongoose");

const permissionsSchema = new mongoose.Schema(
    {
        projectId: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        headQuartier: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        town: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        about: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        animator: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        organizerName: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        host: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        authorities: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        otherParticipants: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        documents: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        images: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        notes: {
            read: { type: Boolean },
            write: { type: Boolean }
        },
        conversations: {
            read: { type: Boolean },
            write: { type: Boolean }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("permissions", permissionsSchema);
