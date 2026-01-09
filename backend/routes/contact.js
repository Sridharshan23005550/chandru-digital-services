const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.json({ msg: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

router.get("/", async (req, res) => {
  const messages = await Contact.find();
  res.json(messages);
});

module.exports = router;
