import type { Request, Response } from "express";
import { Post } from "../infrastructure/mongodb/models/Post.js";

export class AdminController {
    // View all posts
    static async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await Post.find().sort({ createdAt: -1 });
            res.status(200).json(posts);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Delete any post
    static async deletePost(req: Request, res: Response) {
        try {
            const { postId } = req.params;

            const post = await Post.findByIdAndDelete(postId);

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            res.status(200).json({ message: "Post deleted by admin" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}