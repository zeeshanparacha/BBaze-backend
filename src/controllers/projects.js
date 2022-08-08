const Project = require('../models/projects');
const { createProjectBucket } = require("./s3");

exports.createProject = (req, res) => {
  // create new project
  const newProject = new Project(req.body);
  newProject.save(async (err, result) => {
    if (err) {
      return res.status(500).json({
        error: 'Error creating project in database. Try later',
        code: 0,
      });
    }
    let response = await createProjectBucket(result._id);
    if (response.code === 0) {
      return res.json({
        error: 'Error creating project in database. Try later',
        code: 0,
      });
    }
    return res.json({
      message: 'Project created successfully.',
      result,
      code: 1
    });
  });
};

exports.updateProject = (req, res) => {
  // update a project
  const { _id } = req.body;
  Project.findOneAndUpdate({ _id }, req.body, { new: true }).exec(async (err, project) => {
    if (err || !project) {
      return res.status(400).json({
        error: 'Error saving project in database. Try later',
        code: 0
      });
    }
    return res.json({
      message: 'Project updated successfully.',
      data: project,
      code: 1
    });
  });
};


exports.getProjectsByCategory = (req, res) => {
  const { category } = req.body;
  Project.find({ category, status: { $ne: "pending" } }).populate('user').exec(async (err, projects) => {
    if (err || !projects) {
      return res.status(400).json({
        error: 'Projects not found.',
        code: 0
      });
    }
    return res.json({
      data: projects,
      code: 1
    });
  });
};

exports.getProject = (req, res) => {
  const { _id } = req.body;
  Project.findOne({ _id }).populate('user').exec(async (err, project) => {
    if (err || !project) {
      return res.status(400).json({
        error: 'Project not found',
        code: 0
      });
    }
    return res.json({
      data: project,
      code: 1
    });
  });
};

exports.getApproveProjects = (_, res) => {
  Project.find({ status: "pending" }).exec(async (err, projects) => {
    if (err || !projects) {
      return res.status(400).json({
        error: 'Unable to get pending projects',
        code: 0
      });
    }
    return res.json({
      data: projects,
      code: 1
    });
  });
};

exports.approveProject = (req, res) => {
  const { _id } = req.body;
  Project.findOneAndUpdate({ _id }, { $set: { 'status': 'approved' } }).exec(async (err, project) => {
    if (err || !project) {
      return res.status(400).json({
        error: 'Unable to approve project',
        code: 0
      });
    }
    return res.json({
      data: project,
      code: 1
    });
  });
};

exports.rejectProject = (req, res) => {
  const { _id } = req.body;
  Project.findOneAndDelete({ _id }).exec(async (err, project) => {
    if (err || !project) {
      return res.status(400).json({
        error: 'Unable to delete project',
        code: 0
      });
    }
    return res.json({
      message: "Project deleted successfully.",
      code: 1
    });
  });
};