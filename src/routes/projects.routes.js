module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const { requireSignin, authenticate } = require("../controllers/auth");
  const { createProject, getProjectsByCategory, getProject, updateProject } = require("../controllers/projects");

  router.post('/create-project', requireSignin, authenticate, createProject);
  router.post('/get-projects-by-category', requireSignin, authenticate, getProjectsByCategory);
  router.post('/get-project', requireSignin, authenticate, getProject);
  router.post('/update-project', requireSignin, authenticate, updateProject);

  app.use("/projects", router);
};
