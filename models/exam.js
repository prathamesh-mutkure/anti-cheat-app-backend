const mongoose = require("mongoose");
const { QuestionSchema } = require("./question");

const { ObjectId } = mongoose;

const examSchema = new mongoose.Schema({
  _id: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 16,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  questionCount: {
    type: Number,
    min: 0,
    default: 0,
  },
  answerKeys: {
    type: Array,
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
