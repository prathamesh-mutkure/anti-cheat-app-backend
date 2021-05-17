const mongoose = require("mongoose");

const { ObjectId } = mongoose;

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedExams: {
    type: Array[ObjectId],
    default: [],
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
