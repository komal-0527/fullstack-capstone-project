const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("../config/db");

async function register(req, res) {
  try {
    const db = await connectToDatabase();

    const {
      name,
      email,
      password
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existingUser = await db.collection("users").findOne({
      email
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
}

async function login(req, res) {
  try {
    const db = await connectToDatabase();

    const {
      email,
      password
    } = req.body;

    const user = await db.collection("users").findOne({
      email
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
}

async function updateUser(req, res) {
  try {
    const db = await connectToDatabase();

    const userId = req.user.id;

    const updates = {
      updatedAt: new Date()
    };

    if (req.body.name) {
      updates.name = req.body.name;
    }

    if (req.body.email) {
      updates.email = req.body.email;
    }

    const { ObjectId } = require("mongodb");

    const result = await db.collection("users").updateOne(
      {
        _id: new ObjectId(userId)
      },
      {
        $set: updates
      }
    );

    res.json({
      message: "User information updated",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message
    });
  }
}

module.exports = {
  register,
  login,
  updateUser
};