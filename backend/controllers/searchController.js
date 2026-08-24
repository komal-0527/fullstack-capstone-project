const { connectToDatabase } = require("../config/db");

async function searchGifts(req, res) {
  try {
    const db = await connectToDatabase();

    const {
      category,
      q
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i"
      };
    }

    if (q) {
      filter.$or = [
        {
          title: {
            $regex: q,
            $options: "i"
          }
        },
        {
          description: {
            $regex: q,
            $options: "i"
          }
        }
      ];
    }

    const gifts = await db
      .collection("gifts")
      .find(filter)
      .toArray();

    res.json(gifts);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
}

module.exports = {
  searchGifts
};