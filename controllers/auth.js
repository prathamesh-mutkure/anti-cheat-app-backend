const { handleError, handleSuccess } = require("../utils/handleResponse");
const { check, validationResult } = require("express-validator");
const Student = require("../models/student");

exports.login = (req, res) => {
  const errors = validationResult(req);
  const { id, password } = req.body;

  if (!errors.isEmpty()) {
    return res.json({
      err: errors.errors[0].msg,
    });
  }

  Student.findById(id, (err, student) => {
    if (err) return handleError(res, "Database error, please try again!", 400);

    if (!student) return handleError(res, "Student does not exist!", 400);

    if (!student.authenticate(password))
      return handleError(res, "Incorrect username or password!", 401);

    const { _id, fname, lname, assignedExams } = student;

    return res.json({ id: _id, fname, lname, assignedExams });
  });
};
