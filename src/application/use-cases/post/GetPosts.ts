import { Post } from "../../../infrastructure/mongodb/models/Post.js";
import { Comment } from "../../../infrastructure/mongodb/models/Comment.js";
import { Like } from "../../../infrastructure/mongodb/models/Like.js";

export class GetPosts {
    async execute(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const result = [];

        for (const post of posts) {
            const comments = await Comment.find({ postId: post._id.toString() });

            const likeCount = await Like.countDocuments({
                postId: post._id.toString(),
            });

            result.push({
                ...post.toObject(),
                likes: likeCount,
                comments,
            });
        }

        return result;
    }
}