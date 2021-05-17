const { handleError, handleSuccess } = require("../utils/handleResponse");
const Student = require("../models/Student");

exports.getStudentByID = (req, res, next, id) => {
  Student.findById(id, (err, student) => {
    if (err || !student) handleError(res, "User not found!", 400);
    req.student = student;
    next();
  });
};
