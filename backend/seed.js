const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  const User = require("./src/models/Users");

  await User.deleteMany({ email: "admin@medident.com" });

  const hashed = await bcrypt.hash("123456", 10);

  await User.collection.insertOne({
    firstName: "Test",
    lastName: "Admin",
    email: "admin@medident.com",
    password: hashed,
    phone: "9999999999",
    role: "admin",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("✅ Admin created!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.log("❌", err.message);
  process.exit(1);
});