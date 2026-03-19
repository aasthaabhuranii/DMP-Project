const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId:     { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
  status:       { type: String, enum: ["applied", "accepted", "rejected"], default: "applied" },
  appliedAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);