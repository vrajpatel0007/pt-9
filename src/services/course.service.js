const Course = require("../models/course.model");

const createCourse = async (body) => {
    return await Course.create(body);
};

const updateCourse = async (id, body) => {
    return await Course.findByIdAndUpdate(id, { $set: body }, { new: true });
}

const findById = async (id) => {
    return await Course.findById(id);
}

const addstudant = async (id, studentId) => {
    return await Course.findByIdAndUpdate(id, { $push: { students: studentId } }, { new: true });
}

const removeStudentFromCourse = async (id, studentId) => {
    return await Course.findByIdAndUpdate(id, { $pull: { students: studentId } }, { new: true });
};
const deleteCourse = async(id)=>{
    return await Course.findByIdAndDelete(id);
}

const getAllCourses = async()=>{
    return await Course.find();
}

module.exports = {
    createCourse,
    updateCourse,
    findById,
    addstudant,
    removeStudentFromCourse,
    deleteCourse,
    getAllCourses
}