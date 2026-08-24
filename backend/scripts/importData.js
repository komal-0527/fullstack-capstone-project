require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { connectToDatabase, client } = require("../config/db");

async function importData() {
  try {
    const db = await connectToDatabase();

    const filePath = path.join(__dirname, "../data/gifts.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const collection = db.collection("gifts");

    await collection.deleteMany({});

    const result = await collection.insertMany(data);

    console.log("inserted_items");
    console.log(result.insertedIds);
    console.log(`Total documents inserted: ${result.insertedCount}`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

importData();