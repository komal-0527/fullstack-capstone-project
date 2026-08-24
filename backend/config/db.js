const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const client = new MongoClient(uri);

let db;

const connectToDatabase = async () => {
  if (db) {
    return db;
  }

  await client.connect();

  db = client.db(process.env.MONGODB_DB_NAME || "giftlink");

  console.log("MongoDB connected successfully");

  return db;
};

module.exports = {
  connectToDatabase,
  client,
};