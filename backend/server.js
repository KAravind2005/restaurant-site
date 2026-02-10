const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ CREATE FIRST

const connectDB = require("./config/db");
const Contact = require("./models/Contact");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const mongoose = require("mongoose");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use("/api/auth", authRoutes);

console.log("MONGO_URI from env:", process.env.MONGO_URI);

console.log("Starting server...");

connectDB();

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.post("/contact", authMiddleware, async (req, res) => {
  try {
    console.log("BODY", req.body);
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });
    await newContact.save();

    res.json({
      success: true,
      message: "Saved to database successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
