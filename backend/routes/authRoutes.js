const express = require("express");

const router = express.Router();

const {
  register,
  login,
  updateUser,
} = require("../controllers/authController");

const {
  authenticateToken,
} = require("../middleware/authMiddleware");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// PUT /api/auth/profile
router.put("/profile", authenticateToken, updateUser);

module.exports = router;