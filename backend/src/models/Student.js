const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true, unique: true },
  phone:   { type: String, required: true },
  country: { type: String },
  course:  { type: String },
  message: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);