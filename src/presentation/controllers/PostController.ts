import { type Request, type Response } from "express";
import { CreatePost } from "../../application/use-cases/post/CreatePost.js";

export class PostController {
    static async create(req: any, res: Response) {
        try {
            const { title, body } = req.body;
            const userId = req.user.userId;

            const useCase = new CreatePost();
            const post = await useCase.execute(title, body, userId);

            res.status(201).json(post);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}