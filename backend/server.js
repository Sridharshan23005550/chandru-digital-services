const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
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
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
} else {
  // Default route for dev without static files
  app.get("/", (req, res) => {
    res.send("API is running...");
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
