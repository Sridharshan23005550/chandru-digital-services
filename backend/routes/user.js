const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");

/* ======================
   GET USER BY ID
====================== */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ======================
   SAVE SERVICE HISTORY
====================== */
router.post("/history", verifyToken, async (req, res) => {
  const { service } = req.body;

  if (!service) {
    return res.status(400).json({ msg: "Service name required" });
  }

  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { history: service } }
    );
    res.json({ msg: "History saved" });
  } catch (err) {
    console.error("History save error:", err);
    res.status(500).json({ msg: "Error saving history" });
  }
});

/* ======================
   GET USER HISTORY
====================== */
router.get("/:id/history", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("history");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ history: user.history });
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ======================
   UPDATE USER PROFILE
====================== */
router.put("/profile", verifyToken, async (req, res) => {
  const { name, phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    ).select("-password -__v");

    res.json({ msg: "Profile updated", user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ msg: "Error updating profile" });
  }
});

module.exports = router;
