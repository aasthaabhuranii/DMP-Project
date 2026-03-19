const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  const User = require("./src/models/Users");
  await User.deleteMany({ role: "counsellor" });

  const hashed = await bcrypt.hash("123456", 10);

  await User.collection.insertMany([
    {
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya@medident.com",
      password: hashed,
      phone: "9876500001",
      role: "counsellor",
      specialization: "UK · USA · Canada",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: "Rahul",
      lastName: "Mehta",
      email: "rahul@medident.com",
      password: hashed,
      phone: "9876500002",
      role: "counsellor",
      specialization: "Australia · New Zealand",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: "Anita",
      lastName: "Patel",
      email: "anita@medident.com",
      password: hashed,
      phone: "9876500003",
      role: "counsellor",
      specialization: "Germany · Europe",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ 3 Counsellors created!");
  console.log("🌍 Priya Sharma   → UK · USA · Canada       → priya@medident.com / 123456");
  console.log("🌏 Rahul Mehta    → Australia · New Zealand  → rahul@medident.com / 123456");
  console.log("🌍 Anita Patel    → Germany · Europe         → anita@medident.com / 123456");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.log("❌", err.message);
  process.exit(1);
});