const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const { getStudentByID, submitExam } = require("../controllers/student");

router.param("studentId", getStudentByID);

router.post("/submitExam/:studentId", submitExam);

module.exports = router;
