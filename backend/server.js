// ===============================
// Campus Connect Backend Server
// ===============================

// ✅ Import Packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// ✅ Create Express App
const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// ✅ MongoDB Atlas Connection
// ===============================

mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0.lxmcdmd.mongodb.net/campusconnect?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ===============================
// ✅ MODELS (Schemas)
// ===============================

// ✅ User Schema (Login/Register)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// ✅ Marketplace Resource Schema
const ResourceSchema = new mongoose.Schema({
  name: String,
  price: String,
  img: String,
  user: String,
});
const Resource = mongoose.model("Resource", ResourceSchema);

// ✅ Doubt Forum Schema
const DoubtSchema = new mongoose.Schema({
  question: String,
  answer: String,
});
const Doubt = mongoose.model("Doubt", DoubtSchema);

// ===============================
// ✅ ROUTES (APIs)
// ===============================

// ✅ TEST Route
app.get("/", (req, res) => {
  res.send("✅ Campus Connect Backend is Running!");
});

// --------------------------------
// ✅ AUTH API (Register/Login)
// --------------------------------

// ✅ Register User
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "✅ User Registered Successfully" });
});

// ✅ Login User
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "❌ User Not Found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({ message: "❌ Wrong Password" });
  }

  res.json({ message: "✅ Login Successful", user });
});

// --------------------------------
// ✅ MARKETPLACE API
// --------------------------------

// ✅ Get All Items
app.get("/api/resources", async (req, res) => {
  const items = await Resource.find();
  res.json(items);
});

// ✅ Add New Item
app.post("/api/resources", async (req, res) => {
  const item = new Resource(req.body);
  await item.save();
  res.json({ message: "✅ Item Added Successfully" });
});

// --------------------------------
// ✅ DOUBTS API
// --------------------------------

// ✅ Get All Doubts
app.get("/api/doubts", async (req, res) => {
  const doubts = await Doubt.find();
  res.json(doubts);
});

// ✅ Post New Doubt
app.post("/api/doubts", async (req, res) => {
  const doubt = new Doubt(req.body);
  await doubt.save();
  res.json({ message: "✅ Doubt Posted Successfully" });
});

// ===============================
// ✅ START SERVER
// ===============================

app.listen(5000, () => {
  console.log("✅ Server Started at http://localhost:5000");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

