const express = require("express");
const router = express.Router();
const enrollment_controller = require("../controllers/enrollment.controller");
const { authUser, authorizeAdmin } = require("../middleware/auth");


router.post('/enroll', authUser, authorizeAdmin, enrollment_controller.enrollStudent);
router.post('/remove', authUser, authorizeAdmin, enrollment_controller.removeStudent);

router.get('/status', authUser, enrollment_controller.getEnrollmentStatus);

module.exports = router;
