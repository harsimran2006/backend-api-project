import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/forum_db");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
};