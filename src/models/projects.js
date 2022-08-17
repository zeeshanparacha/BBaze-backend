const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    headQuartier: {
      type: String,
    },
    town: {
      type: String,
    },
    about: {
      type: String,
    },
    animator: {
      type: String,
    },
    organizerName: {
      type: String,
    },
    host: {
      type: String,
    },
    authorities: [{
      name: { type: String },
      roleTitle: { type: String },
    }],
    otherParticipants: [{
      name: { type: String },
      roleTitle: { type: String },
    }],
    documents: [{
      url: { type: String }
    }],
    images: [{
      url: { type: String }
    }],
    status: {
      type: String,
      default: "pending"
    },
    notes: [{
      meetingDate: { type: Date },
      text: { type: String },
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", projectSchema);
