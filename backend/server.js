const connectDB = require("./config/db");
const Contact = require("./models/Contact");
const cors = require("cors");

const express = require("express");

const app = express();
app.use(cors());
connectDB();

app.use(express.json());

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
