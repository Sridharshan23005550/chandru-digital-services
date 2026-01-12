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
const frontendPaths = [
  path.join(__dirname, "../frontend/dist"),
  path.join(__dirname, "../frontend/build"),
  path.join(__dirname, "../../frontend/dist"),
  path.join(__dirname, "../../frontend/build")
];

let indexPath = null;
let staticPath = null;

for (const p of frontendPaths) {
  const possibleIndex = path.join(p, "index.html");
  if (fs.existsSync(possibleIndex)) {
    indexPath = possibleIndex;
    staticPath = p;
    break;
  }
}

if (indexPath && staticPath) {
  console.log("📁 Serving static frontend from:", staticPath);
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
} else {
  console.warn("⚠️ Frontend build not found in common locations.");
  app.get("*", (req, res) => {
    res.status(404).send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h1 style="color: #e94560;">Frontend Not Found</h1>
        <p>The server could not find the bundled frontend files.</p>
        <p><b>Paths checked:</b></p>
        <pre style="background: #f4f4f4; padding: 10px; display: inline-block; text-align: left;">${frontendPaths.join('\n')}</pre>
        <p>Please ensure you have run the build command correctly.</p>
      </div>
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
