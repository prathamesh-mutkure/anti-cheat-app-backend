const express = require("express");
const { check, validationResult } = require("express-validator");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const router = express.Router();

const { getStudentByID, submitExam } = require("../controllers/student");

router.param("studentId", getStudentByID);

router.post("/submitExam/:studentId", isSignedIn, isAuthenticated, submitExam);

module.exports = router;
