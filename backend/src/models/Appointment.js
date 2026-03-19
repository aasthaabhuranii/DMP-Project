const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  studentId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  counsellorId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  scheduleDate:  { type: Date, required: true },
  scheduleTime:  { type: String },
  mode:          { type: String, default: "Video Call" },
  notes:         { type: String, default: "" },
  sessionStatus: { type: String, enum: ["pending", "accepted", "rejected", "completed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);