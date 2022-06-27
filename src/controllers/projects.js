const Project = require('../models/projects');
const JWT = require('jsonwebtoken');

exports.createProject = (req, res) => {
  // create new project
  const newProject = new Project(req.body);
  newProject.save((err, result) => {
    if (err) {
      return res.status(401).json({
        error: 'Error saving project in database. Try later',
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


exports.getProjectsByCategory = (req, res) => {
  const { category } = req.body;
  Project.find({ category }).exec(async (err, projects) => {
    if (err || !projects) {
      return res.status(400).json({
        error: 'Projects not found',
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
  Project.findOne({ _id }).exec(async (err, project) => {
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
