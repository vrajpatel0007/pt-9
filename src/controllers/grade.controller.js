const course_service = require('../services/course.service');

const assignGrade = async (req, res) => {
    try {
        const { courseId, studentId, grade } = req.body;
        const course = await course_service.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find the student within the enrolled students of the course
        const studentEntry = course.students.find(s => s.student._id.toString() === studentId);
        if (!studentEntry) {
            return res.status(404).json({ message: 'Student not enrolled in this course' });
        }

        studentEntry.grade = grade;

        await course.save();

        return res.json({ message: 'Grade assigned successfully' });
    } catch (error) {
        console.log("🚀 ~ assignGrade ~ error:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    assignGrade
}