import { Post } from "../../../infrastructure/mongodb/models/Post.js";

export class EditPost {
    async execute(postId: string, userId: string, title: string, body: string) {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error("Post not found");
        }

        if (post.userId !== userId) {
            throw new Error("Unauthorized");
        }

        post.title = title;
        post.body = body;

        await post.save();

        return post;
    }
}