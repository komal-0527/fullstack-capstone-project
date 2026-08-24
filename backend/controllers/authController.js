const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const { connectToDatabase } = require("../config/db");

// Register a new user
async function register(req, res) {
  try {
    const db = await connectToDatabase();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check whether the user already exists
    const existingUser = await db.collection("users").findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
}

// Login user
async function login(req, res) {
  try {
    const db = await connectToDatabase();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const user = await db.collection("users").findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
}

// Update logged-in user's information
async function updateUser(req, res) {
  try {
    const db = await connectToDatabase();

    const userId = req.user.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const updates = {
      updatedAt: new Date(),
    };

    if (req.body.name) {
      updates.name = req.body.name.trim();
    }

    if (req.body.email) {
      updates.email = req.body.email.toLowerCase().trim();
    }

    if (!updates.name && !updates.email) {
      return res.status(400).json({
        success: false,
        message: "No information provided to update",
      });
    }

    const result = await db.collection("users").updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: updates,
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User information updated",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Update user error:", error);

    return res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
}

module.exports = {
  register,
  login,
  updateUser,
};
