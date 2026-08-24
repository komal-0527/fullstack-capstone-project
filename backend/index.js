require("dotenv").config();

const app = require("./app");
const { connectToDatabase } = require("./config/db");
const natural = require("natural");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();

    console.log("Natural package loaded:", !!natural);

    app.listen(PORT, () => {
      console.log(`GiftLink API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();