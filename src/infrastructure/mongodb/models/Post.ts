import mongoose from "mongoose";

export interface IPost {
  title: string;
  body: string;
  userId: string;
}

export interface IPostDocument extends mongoose.Document, IPost { }

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel =
  (mongoose.models.Post as mongoose.Model<IPostDocument>) ||
  mongoose.model<IPostDocument>("Post", postSchema);

export const Post = PostModel;