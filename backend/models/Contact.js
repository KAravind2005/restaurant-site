import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;