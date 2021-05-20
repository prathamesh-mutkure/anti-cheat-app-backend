const mongoose = require("mongoose");

const { ObjectId } = mongoose;

const submittedExamSchema = new mongoose.Schema(
  {
    examId: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
  },
  { strict: false }
);

const SubmittedExam = mongoose.model("SubmittedExam", studentSchema);

module.exports = SubmittedExam;
