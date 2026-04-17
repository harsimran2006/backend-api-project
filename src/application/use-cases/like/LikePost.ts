import { Like } from "../../../infrastructure/database/models/Like.js";

export class LikePost {
    async execute(postId: string, userId: string) {
        const like = await Like.create({ postId, userId });
        return like;
    }
}