const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name:    { type: String, required: true },
  country: { type: String, required: true },
  ranking: { type: Number },
  status:  { type: String, enum: ["active", "removed"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("University", universitySchema);