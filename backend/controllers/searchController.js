const { connectToDatabase } = require("../config/db");

async function searchGifts(req, res) {
  try {
    const db = await connectToDatabase();

    const { category, q } = req.query;

    const filter = {};

    // Filter gifts by category
    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    // Search by title or description
    if (q) {
      filter.$or = [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          description: {
            $regex: q,
            $options: "i",
          },
        },
      ];
    }

    const gifts = await db
      .collection("gifts")
      .find(filter)
      .toArray();

    res.status(200).json(gifts);
  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
}

module.exports = {
  searchGifts,
};