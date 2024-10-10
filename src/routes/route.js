const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const enrollmentRoute = require("./enrollment.route");
const courseRoute = require("./course.route");
const gradeRoute = require("./grade.route");

routes.use("/user", userRoute);
routes.use("/enrollment", enrollmentRoute);
routes.use("/course", courseRoute);
routes.use("/grade", gradeRoute);

module.exports = routes;
