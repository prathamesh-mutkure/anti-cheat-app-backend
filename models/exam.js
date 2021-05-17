const mongoose = require("mongoose");
const { QuestionSchema } = require("./question");

const { ObjectId } = mongoose;

const examSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
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
  dateTime: {
    type: Date,
    required: true,
  },
  questions: {
    type: Array[QuestionSchema],
    required: true,
  },
  answerKeys: {
    type: Array[String],
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
