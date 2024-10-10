const express = require("express");
const router = express.Router();
const grade_controller = require("../controllers/grade.controller");
const { authUser, authorizeAdmin } = require("../middleware/auth");


router.post('/assign', authUser, authorizeAdmin, grade_controller.assignGrade);

module.exports = router;