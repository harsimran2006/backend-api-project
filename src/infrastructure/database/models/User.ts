import mongoose from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserDocument extends mongoose.Document, IUser { }

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: "user" },
    },
    { timestamps: true }
);

const UserModel = (mongoose.models.User as mongoose.Model<IUserDocument>) ||
    mongoose.model<IUserDocument>("User", userSchema);

export const User = UserModel;
