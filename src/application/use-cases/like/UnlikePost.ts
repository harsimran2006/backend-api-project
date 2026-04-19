import { Like } from "../../../infrastructure/mongodb/models/Like.js";

export class UnlikePost {
    async execute(postId: string, userId: string) {
        await Like.findOneAndDelete({ postId, userId });
        return { message: "Unliked" };
    }
}