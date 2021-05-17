const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const {
  getExamById,
  getExam,
  getAssignedExamList,
} = require("../controllers/exam");

const { getStudentByID } = require("../controllers/student");

router.param("studentId", getStudentByID);
router.param("examId", getExamById);

router.get("/exam/:examId", getExam);

router.get("/:studentId/assignedExams/all", getAssignedExamList);

module.exports = router;
