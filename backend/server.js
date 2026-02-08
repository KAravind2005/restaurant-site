const express = require("express");
const cors = require("cors");

app.use(cors({
  origin: [
    "https://restaurant-site-brown.vercel.app",
    "http://localhost:3000",
    "http://localhost:5500"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

console.log("MONGO_URI from env:", process.env.MONGO_URI);

console.log("Starting server...");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Contact = require("./models/Contact");
const mongoose = require("mongoose");

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.post("/contact", async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    const newContact = new Contact({ name, phone, message });
    await newContact.save();

    res.json({ success: true, message: "saved to database successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
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
