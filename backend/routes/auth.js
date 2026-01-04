const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register (run once)
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashed
  });
  await user.save();
  res.json({ msg: "Admin registered" });
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.json({ msg: "User not found" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.json({ msg: "Wrong password" });

  res.json({ msg: "Login success" });
});

module.exports = router;
