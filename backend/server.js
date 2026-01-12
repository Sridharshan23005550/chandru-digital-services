const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");

const app = express();

// CORS configuration for production
app.use(cors());

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

// Root API route
app.get("/api", (req, res) => {
  res.json({
    status: "Backend operates normally",
    version: "2.0.0"
  });
});

// Serve static assets in production
const frontendDistPath = path.join(__dirname, "../frontend/dist");
const frontendBuildPath = path.join(__dirname, "../frontend/build");

let indexPath = null;

if (fs.existsSync(path.join(frontendDistPath, "index.html"))) {
  indexPath = path.join(frontendDistPath, "index.html");
  app.use(express.static(frontendDistPath));
} else if (fs.existsSync(path.join(frontendBuildPath, "index.html"))) {
  indexPath = path.join(frontendBuildPath, "index.html");
  app.use(express.static(frontendBuildPath));
}

if (indexPath) {
  console.log("📁 Serving static frontend from:", path.dirname(indexPath));
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
} else {
  console.warn("⚠️ Frontend build (dist or build) not found.");
  app.get("*", (req, res) => {
    res.status(404).send(`
      <h1>Frontend Not Built</h1>
      <p>The frontend build was not found in either 'frontend/dist' or 'frontend/build'.</p>
      <p>Please ensure your build command is running correctly on Render.</p>
    `);
  });
}

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ msg: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
