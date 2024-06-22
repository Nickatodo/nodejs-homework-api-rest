const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database error connection");
    process.exit(1);
  }
};

module.exports = connectDB;
