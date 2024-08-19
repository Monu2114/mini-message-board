const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    const db =
      process.env.NODE_env == "production"
        ? process.env.DB_CONNECTION
        : process.env.LOCAL_CONNECTION;
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
