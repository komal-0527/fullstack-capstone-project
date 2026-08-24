const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { connectToDatabase } = require("../config/db");
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

// Get the current logged-in user
// GET /api/auth/current-user
router.get("/current-user", authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();

    // Find the current user in the users collection
    const user = await db.collection("users").findOne({
      _id: new (require("mongodb").ObjectId)(req.user.id),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get current user",
      error: error.message,
    });
  }
});

// Update logged-in user's information
// PUT /api/auth/profile
router.put("/profile", authenticateToken, updateUser);

module.exports = router;