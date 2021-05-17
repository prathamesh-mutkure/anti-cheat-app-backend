const mongoose = require("mongoose");

const { ObjectId } = mongoose;

const studentSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
    trim: true,
  },
  fname: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lname: {
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

studentSchema.methods = {
  authenticate: function (plainPassword) {
    return this.plainPassword === this.password;
  },
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
