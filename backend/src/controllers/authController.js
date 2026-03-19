const User          = require("../models/Users");
const generateToken = require("../utils/generateToken");
const { sendOTPEmail, sendWelcomeEmail } = require("../utils/sendEmail");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, course, targetCountry, country } = req.body;
    if (!firstName || !lastName || !email || !password || !phone)
      return res.status(400).json({ success: false, message: "Please fill all required fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

    const user = await User.create({ firstName, lastName, email, password, phone, role: "student", course, targetCountry, country });
    try { await sendWelcomeEmail(email, firstName); } catch (e) { console.log("Email error:", e.message); }

    const token = generateToken(user._id, user.role);
    res.status(201).json({ success: true, token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Please provide email and password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    if (role && user.role !== role)
      return res.status(401).json({ success: false, message: `No ${role} account found with this email` });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    if (user.status === "inactive")
      return res.status(403).json({ success: false, message: "Account inactive. Contact admin." });

    const token = generateToken(user._id, user.role);
    res.json({ success: true, token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ success: true, message: "If this email is registered, an OTP has been sent." });

    const otp = generateOTP();
    user.resetOTP = otp;
    user.resetOTPExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    await sendOTPEmail(req.body.email, otp, user.firstName);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, resetOTP: otp });
    if (!user || user.resetOTPExpire < Date.now())
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    res.json({ success: true, message: "OTP verified" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email, resetOTP: otp });
    if (!user || user.resetOTPExpire < Date.now())
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    user.password = newPassword;
    user.resetOTP = null;
    user.resetOTPExpire = null;
    await user.save();
    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -resetOTP -resetOTPExpire");
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

module.exports = { register, login, forgotPassword, verifyOTP, resetPassword, getMe };