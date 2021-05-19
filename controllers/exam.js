const { handleError, handleSuccess } = require("../utils/handleResponse");
const Exam = require("../models/exam");

exports.getExamById = (req, res, next, id) => {
  Exam.findById(id, (err, exam) => {
    if (err) return handleError(res, "Database error, please try again!", 400);

    if (!exam) return handleError(res, "Exan does not exist!", 400);

    req.exam = exam;
    next();
  });
};

exports.getAssignedExamList = (req, res) => {
  const assignedExams = req.student.assignedExams;
  const assignedExamIds = assignedExams.map((exam) => exam.examId);

  Exam.find({ _id: { $in: assignedExamIds } })
    .lean()
    .exec((err, exams) => {
      if (err || !exams)
        handleError(res, "DB Error, cannot get assigned Exams.");

      exams.forEach((_, i) => {
        exams[i].questions = undefined;
        exams[i].answerKeys = undefined;
        exams[i].status = assignedExams[i].status;
      });

      return res.json({ exams });
    });
};

exports.getExam = (req, res) => {
  if (!req.exam) return handleError(res, "Cannot get Exam, DB Error!");

  const exam = req.exam;
  exam.answerKeys = undefined;

  return res.json(exam);
};

exports.createExam = (req, res) => {
  const exam = new Exam({ ...req.body });

  exam.save().then((exam) => {
    if (!exam) handleError(res, "Error creating Exam!");

    return res.json(exam);
  });
};
