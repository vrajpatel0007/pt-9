const course_service = require('../services/course.service');
const user_service = require('../services/user.service');

const enrollStudent = async (req, res) => {
    const courseId = req.body.courseId
    const studentId = req.body.studentId
    const course = await course_service.findById(courseId);
    const student = await user_service.findById(studentId);

    if (!course || !student) {
        return res.status(400).jason({ message: "Course or Student not found" })
    }

    if (course.students.includes(studentId)) {
        return res.status(400).jason({ message: "Student is already enrolled" })
    }

    const addstu = await course_service.addstudant(courseId, studentId)
    console.log("🚀 ~ enrollStudent ~ addstu:", addstu)
    const addcor = await user_service.addcor(studentId, courseId)
    console.log("🚀 ~ enrollStudent ~ addcor:", addcor)
    return res.status(200).json({ message: 'Student enrolled successfully' });
};

const removeStudent = async (req, res) => {
    const courseId = req.body.courseId
    const studentId = req.body.studentId
    const course = await course_service.findById(courseId);
    const student = await user_service.findById(studentId);

    if (!course || !student) {
        return res.status(400).jason({ message: "Course or Student not found" });
    }


    if (!course.students.includes(studentId)) {
        return res.status(400).jason({ message: "Student is not enrolled in this course" });
    }

    const removecorse = await course_service.removeStudentFromCourse(courseId, studentId)
    console.log("🚀 ~ removeStudent ~ removecorse:", removecorse)
    const removestud = await user_service.removeCourseFromStudent(studentId, courseId)
    console.log("🚀 ~ removeStudent ~ removestud:", removestud)
    return res.status(200).json({ message: "Student removed from course successfully" });
};

const getEnrollmentStatus = async (req, res) => {
    const studentId = req.body.studentId;
    const student = user_service.getEnrollmentStatus(studentId)
    if (!student) {
        return res.status(400).jason({ message: "Student not found" });
    }
    return student.enrolledCourses;
};

module.exports = {
    enrollStudent,
    removeStudent,
    getEnrollmentStatus,
};