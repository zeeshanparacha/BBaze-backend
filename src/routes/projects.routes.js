module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const { requireSignin, authenticate } = require("../controllers/auth");
  const { createProject, getProjectsByCategory, getProject, updateProject, approveProject, rejectProject, getApproveProjects, closeProject } = require("../controllers/projects");

  router.post('/create-project', requireSignin, authenticate, createProject);
  router.post('/get-projects-by-category', requireSignin, authenticate, getProjectsByCategory);
  router.post('/get-project', requireSignin, authenticate, getProject);
  router.post('/update-project', requireSignin, authenticate, updateProject);
  router.post('/approve-project', requireSignin, authenticate, approveProject);
  router.post('/reject-project', requireSignin, authenticate, rejectProject);
  router.get('/get-pending-projects', requireSignin, authenticate, getApproveProjects);
  router.post('/close-project', requireSignin, authenticate, closeProject);

  app.use("/projects", router);
};
