module.exports = function (app) {
  require("./auth.routes")(app);
  require("./projects.routes")(app);
};
