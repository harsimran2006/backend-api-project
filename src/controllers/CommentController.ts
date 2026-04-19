import type { Request, Response } from "express";
import { CreateComment } from "../application/use-cases/comment/CreateComment.js";

export class CommentController {
    static async create(req: any, res: Response) {
        try {
            const { postId, body } = req.body;
            const userId = req.user.userId;

            const useCase = new CreateComment();
            const comment = await useCase.execute(postId, userId, body);

            res.status(201).json(comment);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}