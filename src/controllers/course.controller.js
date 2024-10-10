const course_service = require('../services/course.service');

const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }
        const body = {
            title: title,
            description: description,
            teacher: req.user.id
        };
        console.log("🚀 ~ createCourse ~ body:", body)
        const course = await course_service.createCourse(body)
        return res.status(201).json({ message: 'Course created successfully', course: Course });
    } catch (error) {
        console.log("🚀 ~ createCourse ~ error:", error)
        return res.status(500).json({ message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const course = await course_service.findById(req.body.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const body = {};
        if (req.body) {
            body.title = req.body.title ;
            body.description = req.body.description;
        }
        const updatecorse = await course_service.updateCourse(req.body.id,body)
        return res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.body.id;  // Use the course ID from the URL parameters
        const course = await course_service.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await course_service.deleteCourse(courseId);  // Call the service to delete the course
        return res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error("🚀 ~ deleteCourse ~ error:", error);
        return res.status(500).json({ message: error.message });
    }
};

const getCourse = async (req, res) => {
    try {
        const courseId = req.body.id; 
        const course = await course_service.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.error("🚀 ~ getCourse ~ error:", error);
        return res.status(500).json({ message: error.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await course_service.getAllCourses();
        return res.status(200).json(courses);
    } catch (error) {
        console.error("🚀 ~ getAllCourses ~ error:", error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
    getAllCourses
}