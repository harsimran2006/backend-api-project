import { Comment } from "../../../infrastructure/database/models/Comment.js";

export class CreateComment {
    async execute(postId: string, userId: string, body: string) {
        const comment = await Comment.create({
            postId,
            userId,
            body,
        });

        return comment;
    }
}