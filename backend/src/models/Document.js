const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  studentId:          { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type:               { type: String, enum: ["passport", "sop", "marksheet"], required: true },
  fileURL:            { type: String, required: true },
  verificationStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  uploadedAt:         { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);