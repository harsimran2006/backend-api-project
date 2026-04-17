import { Like } from "../../../infrastructure/database/models/Like.js";

export class UnlikePost {
    async execute(postId: string, userId: string) {
        await Like.findOneAndDelete({ postId, userId });
        return { message: "Unliked" };
    }
}