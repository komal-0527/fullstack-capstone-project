const { connectToDatabase } = require("../config/db");

async function searchGifts(req, res) {
  try {
    const db = await connectToDatabase();

    const { q, category } = req.query;

    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by title or description
    if (q) {
      query.$or = [
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
      .find(query)
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