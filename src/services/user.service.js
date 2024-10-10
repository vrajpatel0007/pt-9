const User = require("../models/user.model");

const register = async (body) => {
  return User.create(body);
};

const findemail = async (email) => {
  return await User.findOne({ Email: email });
};


const findById = async (id) => {
  return await User.findById(id);
};

const addcor = async (id, courseId) => {
  return await User.findByIdAndUpdate(id, { $push: { enrolledCourses: courseId } }, { new: true });
}

const removeCourseFromStudent = async (id, courseId) => {
  return await User.findByIdAndUpdate(id,{ $pull: { enrolledCourses: courseId } },{ new: true });
};

const getEnrollmentStatus = async (id)=>{
  return await User.findById(studentId).populate('enrolledCourses');
}
module.exports = {
  register,
  findemail,
  findById,
  addcor,
  removeCourseFromStudent,
  getEnrollmentStatus
};
