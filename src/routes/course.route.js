const express = require("express");
const router = express.Router();
const corse_controller = require("../controllers/course.controller");
const { authUser, authorizeAdmin } = require("../middleware/auth");

router.post('/createCourse', authUser, authorizeAdmin, corse_controller.createCourse);
router.put('/updateCourse', authUser, authorizeAdmin, corse_controller.updateCourse);
router.delete('/deleteCourse', authUser, authorizeAdmin, corse_controller.deleteCourse);
router.get('/getCoursebyid', authUser, corse_controller.getCourse);
router.get('/getAllCourses', authUser, corse_controller.getAllCourses);

module.exports = router;