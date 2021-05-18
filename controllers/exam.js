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
  Exam.find({ _id: { $in: req.student.assignedExams } }, (err, exams) => {
    if (err || !exams) handleError(res, "DB Error, cannot get assigned Exams.");

    exams.forEach((_, i) => {
      exams[i].questions = undefined;
      exams[i].answerKeys = undefined;
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
  const map = new Map();

  map.set("A", "1");
  map.set("B", "2");
  map.set("C", "3");
  map.set("D", "None");

  const exam = new Exam({
    _id: "220002",
    name: "Maths",
    dateTime: Date.now(),
    questions: [
      {
        title: "What is the sum of 1 and 2",
        options: map,
      },
    ],
    answerKeys: ["A"],
  });

  exam.save().then((exam) => {
    if (!exam) handleError(res, "Error creating Exam!");

    res.json({ exam });
  });
};
