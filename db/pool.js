const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION || process.env.MONGO_URL,
      {}
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
