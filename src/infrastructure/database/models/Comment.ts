import mongoose from "mongoose";

export interface IComment {
    postId: string;
    userId: string;
    body: string;
}

export interface ICommentDocument extends mongoose.Document, IComment { }

const commentSchema = new mongoose.Schema<ICommentDocument>(
    {
        postId: { type: String, required: true },
        userId: { type: String, required: true },
        body: { type: String, required: true },
    },
    { timestamps: true }
);

const CommentModel =
    (mongoose.models.Comment as mongoose.Model<ICommentDocument>) ||
    mongoose.model<ICommentDocument>("Comment", commentSchema);

export const Comment = CommentModel;