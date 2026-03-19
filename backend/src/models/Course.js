const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
  name:         { type: String, required: true },
  duration:     { type: String },
  tuitionFee:   { type: Number },
  intake:       { type: String },
});

module.exports = mongoose.model("Course", courseSchema);