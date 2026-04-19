import { Post } from "../../../infrastructure/mongodb/models/Post.js";

export class CreatePost {
    async execute(title: string, body: string, userId: string) {
        const post = await Post.create({
            title,
            body,
            userId,
        });

        return post;
    }
}