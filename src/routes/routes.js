module.exports = function (app) {
  require("./auth.routes")(app);
  require("./projects.routes")(app);
  require("./s3.routes")(app);
  require("./permissions.routes")(app);
  require("./organizations.routes")(app);
  require("./profile.routes")(app);

};
