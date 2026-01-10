const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");
const { JWT_SECRET, verifyToken } = require("../middleware/auth");

/* ======================
   USER REGISTRATION
====================== */
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters" });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || "",
      history: []
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      msg: "Registration successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

/* ======================
   USER LOGIN
====================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter email and password" });
  }

  try {
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        history: user.history
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
});

/* ======================
   ADMIN LOGIN
====================== */
router.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter username and password" });
  }

  try {
    // Find admin
    let admin = await Admin.findOne({ username });

    // Create default admin if none exists
    if (!admin && username === "admin") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin@123", salt);
      admin = new Admin({
        username: "admin",
        password: hashedPassword
      });
      await admin.save();
    }

    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Admin login successful",
      token,
      admin: {
        _id: admin._id,
        username: admin.username
      }
    });

  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ msg: "Server error during admin login" });
  }
});

/* ======================
   VERIFY TOKEN
====================== */
router.get("/verify", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

/* ======================
   TEST ROUTE
====================== */
router.get("/test", (req, res) => {
  res.json({ msg: "Auth route working" });
});

module.exports = router;
