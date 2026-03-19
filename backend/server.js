const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3001", credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.log("❌ MongoDB Error:", err));

app.use("/api/auth",       require("./src/routes/authRoutes"));
app.use("/api/student",    require("./src/routes/studentRoutes"));
app.use("/api/counsellor", require("./src/routes/counsellorRoutes"));

app.get("/", (req, res) => res.json({ message: "🦷 MediDent Backend is Running!" }));
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));