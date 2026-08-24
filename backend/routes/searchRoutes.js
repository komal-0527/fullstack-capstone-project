const express = require("express");

const router = express.Router();

const { connectToDatabase } = require("../config/db");
const { searchGifts } = require("../controllers/searchController");

// Search gifts and filter results by category
router.get(
  "/",
  async (req, res, next) => {
    try {
      await connectToDatabase();
      next();
    } catch (error) {
      next(error);
    }
  },
  searchGifts
);

module.exports = router;