const { handleError, handleSuccess } = require("../utils/handleResponse");
const Student = require("../models/student");

exports.getStudentByID = (req, res, next, id) => {
  Student.findById(id, (err, student) => {
    if (err || !student) handleError(res, "Student not found!", 400);
    req.student = student;
    next();
  });
};
