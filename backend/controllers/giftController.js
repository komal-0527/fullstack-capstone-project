const { connectToDatabase } = require("../config/db");

// Get all gifts
const getAllGifts = async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    const gifts = await db.collection("gifts").find({}).toArray();

    res.status(200).json({
      success: true,
      count: gifts.length,
      gifts,
    });
  } catch (error) {
    next(error);
  }
};

// Get one gift by ID
const getGiftById = async (req, res, next) => {
  try {
    const { ObjectId } = require("mongodb");

    const db = await connectToDatabase();

    const { id } = req.params;

    // Check whether the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gift ID",
      });
    }

    const gift = await db.collection("gifts").findOne({
      _id: new ObjectId(id),
    });

    if (!gift) {
      return res.status(404).json({
        success: false,
        message: "Gift not found",
      });
    }

    res.status(200).json({
      success: true,
      gift,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGifts,
  getGiftById,
};
