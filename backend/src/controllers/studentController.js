const User        = require("../models/Users");
const Appointment = require("../models/Appointment");
const Document    = require("../models/Document");
const Application = require("../models/Application");

// GET /api/student/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("counsellorId", "firstName lastName email phone specialization");
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// PUT /api/student/profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, course, targetCountry, country } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, course, targetCountry, country },
      { new: true }
    ).select("-password");
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// POST /api/student/appointments
exports.bookAppointment = async (req, res) => {
  try {
    const { scheduleDate, scheduleTime, mode, notes } = req.body;
    if (!scheduleDate || !scheduleTime)
      return res.status(400).json({ success: false, message: "Date and time required" });

    const student = await User.findById(req.user._id);
    if (!student.counsellorId)
      return res.status(400).json({ success: false, message: "No counsellor assigned. Contact admin." });

    const appointment = await Appointment.create({
      studentId: req.user._id,
      counsellorId: student.counsellorId,
      scheduleDate, scheduleTime,
      mode: mode || "Video Call",
      notes: notes || "",
    });
    res.status(201).json({ success: true, appointment });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/student/appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ studentId: req.user._id })
      .populate("counsellorId", "firstName lastName email specialization")
      .sort({ scheduleDate: 1 });
    res.json({ success: true, appointments });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// DELETE /api/student/appointments/:id
exports.cancelAppointment = async (req, res) => {
  try {
    const apt = await Appointment.findOne({ _id: req.params.id, studentId: req.user._id });
    if (!apt) return res.status(404).json({ success: false, message: "Appointment not found" });
    if (apt.sessionStatus !== "pending")
      return res.status(400).json({ success: false, message: "Only pending appointments can be cancelled" });
    await apt.deleteOne();
    res.json({ success: true, message: "Appointment cancelled" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/student/documents
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ studentId: req.user._id });
    res.json({ success: true, docs });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/student/applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user._id })
      .populate("courseId", "name duration tuitionFee")
      .populate("universityId", "name country ranking");
    res.json({ success: true, applications });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};