const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ CREATE FIRST

const connectDB = require("./config/db");
const Contact = require("./models/Contact");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const menuRoutes = require("./routes/menu");
const contactRoutes = require("./routes/contactRoutes");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/api/contacts", contactRoutes);

console.log("MONGO_URI from env:", process.env.MONGO_URI);

console.log("Starting server...");

connectDB();

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.post("/api/contacts", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find(); // REMOVE user filter
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/api/contacts/:id", authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
