const express = require("express");

const router = express.Router();

const {
  register,
  login,
  updateUser,
} = require("../controllers/authController");

const { authenticateToken } = require("../middleware/authMiddleware");

// Register a new user
// POST /api/auth/register
router.post("/register", register);

// Login an existing user
// POST /api/auth/login
router.post("/login", login);

// Update logged-in user's information
// PUT /api/auth/profile
router.put("/profile", authenticateToken, updateUser);

module.exports = router;