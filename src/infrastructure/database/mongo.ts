import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri =
        process.env.NODE_ENV === "test"
            ? process.env.MONGO_URI_TEST
            : process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("Mongo URI not defined in .env");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");
};