const { handleError, handleSuccess } = require("../utils/handleResponse");
const Student = require("../models/student");

exports.getStudentByID = (req, res, next, id) => {
  Student.findById(id, (err, student) => {
    if (err || !student) handleError(res, "Student not found!", 400);
    req.student = student;
    next();
  });
};

exports.submitExam = (req, res) => {
  const { examId, answers } = req.body;

  const student = new Student(req.student);

  student.submittedExams[examId] = answers;

  student.save((err, student) => {
    if (err) handleError(res, "Error submitting Exam!");

    res.json(student.submittedExams);
  });
};
