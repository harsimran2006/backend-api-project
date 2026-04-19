import { Post } from "../../../infrastructure/mongodb/models/Post.js";

export class DeletePost {
    async execute(postId: string, userId: string) {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error("Post not found");
        }

        if (post.userId !== userId) {
            throw new Error("Unauthorized");
        }

        await Post.findByIdAndDelete(postId);

        return { message: "Post deleted" };
    }
}