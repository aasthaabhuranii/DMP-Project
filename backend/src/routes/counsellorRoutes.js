const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const User    = require("../models/Users");
const ctrl    = require("../controllers/counsellorController");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) { res.status(401).json({ success: false, message: "Token invalid" }); }
};

router.get("/profile",                      protect, ctrl.getProfile);
router.get("/students",                     protect, ctrl.getMyStudents);
router.get("/appointments",                 protect, ctrl.getAppointments);
router.put("/appointments/:id",             protect, ctrl.updateAppointment);
router.get("/students/:id/documents",       protect, ctrl.getStudentDocuments);

module.exports = router;