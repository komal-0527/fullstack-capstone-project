const express = require("express");
const { connectToDatabase } = require("../config/db");
const { getAllGifts, getGiftById } = require("../controllers/giftController");

const router = express.Router();

// Get all gifts
router.get("/", async (req, res, next) => {
  try {
    await connectToDatabase();
    return getAllGifts(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get a single gift by ID
router.get("/:id", async (req, res, next) => {
  try {
    await connectToDatabase();
    return getGiftById(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;