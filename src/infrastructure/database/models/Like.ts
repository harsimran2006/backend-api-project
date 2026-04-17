import mongoose from "mongoose";

export interface ILike {
    postId: string;
    userId: string;
}

export interface ILikeDocument extends mongoose.Document, ILike { }

const likeSchema = new mongoose.Schema<ILikeDocument>(
    {
        postId: { type: String, required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

// Prevent duplicate likes
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const LikeModel =
    (mongoose.models.Like as mongoose.Model<ILikeDocument>) ||
    mongoose.model<ILikeDocument>("Like", likeSchema);

export const Like = LikeModel;