const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message
    });

    await contact.save();
    res.json({ msg: "Message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error saving message" });
  }
});
// Get all contact messages (Admin)
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});


router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

module.exports = router;
