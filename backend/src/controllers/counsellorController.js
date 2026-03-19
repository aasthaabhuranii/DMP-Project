const User        = require("../models/Users");
const Appointment = require("../models/Appointment");
const Document    = require("../models/Document");

// GET /api/counsellor/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/counsellor/students
exports.getMyStudents = async (req, res) => {
  try {
    const students = await User.find({ counsellorId: req.user._id, role: "student" })
      .select("-password");
    res.json({ success: true, count: students.length, students });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/counsellor/appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ counsellorId: req.user._id })
      .populate("studentId", "firstName lastName email phone course targetCountry")
      .sort({ scheduleDate: 1 });
    res.json({ success: true, appointments });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// PUT /api/counsellor/appointments/:id
exports.updateAppointment = async (req, res) => {
  try {
    const { sessionStatus } = req.body;
    const apt = await Appointment.findOneAndUpdate(
      { _id: req.params.id, counsellorId: req.user._id },
      { sessionStatus },
      { new: true }
    );
    if (!apt) return res.status(404).json({ success: false, message: "Appointment not found" });
    res.json({ success: true, appointment: apt });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/counsellor/students/:id/documents
exports.getStudentDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ studentId: req.params.id });
    res.json({ success: true, docs });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};