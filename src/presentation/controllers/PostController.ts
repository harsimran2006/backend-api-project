import { type Request, type Response } from "express";
import { CreatePost } from "../../application/use-cases/post/CreatePost.js";
import { EditPost } from "../../application/use-cases/post/EditPost.js";
import { DeletePost } from "../../application/use-cases/post/DeletePost.js";

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

    static async edit(req: any, res: Response) {
        try {
            const { postId, title, body } = req.body;
            const userId = req.user.userId;

            const useCase = new EditPost();
            const post = await useCase.execute(postId, userId, title, body);

            res.status(200).json(post);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async delete(req: any, res: Response) {
        try {
            const { postId } = req.body;
            const userId = req.user.userId;

            const useCase = new DeletePost();
            const result = await useCase.execute(postId, userId);

            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}