const express = require("express");
const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.json({ msg: "Auth route working" });
});

router.post("/login", (req, res) => {
  res.json({ msg: "Login success" });
});

module.exports = router;
