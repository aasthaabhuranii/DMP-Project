const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName:      { type: String, required: true },
  lastName:       { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  password:       { type: String, required: true },
  phone:          { type: String },
  role:           { type: String, enum: ["student", "counsellor", "admin"], required: true },
  specialization: { type: String },
  status:         { type: String, enum: ["active", "inactive"], default: "active" },
  counsellorId:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resetOTP:       { type: String },
  resetOTPExpire: { type: Date },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);