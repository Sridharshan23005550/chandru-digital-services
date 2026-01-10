const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { verifyAdmin } = require("../middleware/auth");

/* ======================
   SUBMIT CONTACT MESSAGE (Public)
====================== */
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Please fill all required fields" });
  }

  try {
    await Contact.create({
      name,
      email,
      phone: phone || "",
      message
    });
    res.json({ msg: "Message sent successfully" });
  } catch (err) {
    console.error("Contact save error:", err);
    res.status(500).json({ msg: "Error sending message" });
  }
});

/* ======================
   GET ALL CONTACTS (Admin Only)
====================== */
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Get contacts error:", err);
    res.status(500).json({ msg: "Error fetching messages" });
  }
});

/* ======================
   GET CONTACT COUNT (Admin Only)
====================== */
router.get("/count", verifyAdmin, async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Count error:", err);
    res.status(500).json({ msg: "Error getting count" });
  }
});

/* ======================
   DELETE CONTACT (Admin Only)
====================== */
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Message deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Error deleting message" });
  }
});

module.exports = router;
