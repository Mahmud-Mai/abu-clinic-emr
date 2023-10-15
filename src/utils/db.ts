import mongoose from "mongoose";

export const connectdb = async () => {
  const dbConnection = mongoose.connection;

  dbConnection.on("connecting", () => {
    console.log("Connecting to MongoDB...");
  });

  dbConnection.on("connected", () => {
    console.log("Connected to MongoDB!");
  });

  dbConnection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  dbConnection.on("disconnected", () => {
    console.warn("MongoDB disconnected. Reconnecting...");
  });

  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log(`🚀 Connection to DB established!!!`);
  } catch (error) {
    console.error("Couldn't connect to MongoDB...", error);
  }
};
