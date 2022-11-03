const express = require("express");
const { check, validationResult } = require("express-validator");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const router = express.Router();

const {
  getExamById,
  getExam,
  getAssignedExamList,
  createExam,
} = require("../controllers/exam");

const { getStudentByID } = require("../controllers/student");

router.param("studentId", getStudentByID);
router.param("examId", getExamById);

router.get("/:studentId/exam/:examId", isSignedIn, isAuthenticated, getExam);

router.get(
  "/:studentId/assignedExams/all",
  isSignedIn,
  isAuthenticated,
  getAssignedExamList
);

// TODO: Add isAdmin middleware
router.post("/createExam", isSignedIn, isAuthenticated, createExam);

module.exports = router;
