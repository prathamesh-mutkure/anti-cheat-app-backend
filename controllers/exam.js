const { handleError, handleSuccess } = require("../utils/handleResponse");
const Exam = require("../models/exam");

exports.getExamById = (req, res, next, id) => {
  Exam.findById({ id }, (err, exam) => {
    if (err) return handleError(res, "Database error, please try again!", 400);

    if (!exam) return handleError(res, "Exan does not exist!", 400);

    req.exam = exam;
    next();
  });
};

exports.getAssignedExamList = (req, res) => {
  Exam.find({ _id: { $in: req.student.assignedExams } }, (err, exams) => {
    if (err || !exams) handleError(res, "DB Error, cannot get assigned Exams.");

    console.log(req.student.assignedExams);
    console.log(exams);

    exams.forEach((_, i) => {
      exams[i].questions = null;
      exams[i].answerKeys = null;
    });

    return res.json({ exams });
  });
};

exports.getExam = (req, res) => {
  if (!req.exam) return handleError(res, "Cannot get Exam, DB Error!");

  const _exam = exam;
  _exam.answerKeys = null;

  return res.json({ exam: _exam });
};
