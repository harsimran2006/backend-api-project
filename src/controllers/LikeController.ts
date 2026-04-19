import type { Request, Response } from "express";
import { LikePost } from "../application/use-cases/like/LikePost.js";
import { UnlikePost } from "../application/use-cases/like/UnlikePost.js";

export class LikeController {
    static async like(req: any, res: Response) {
        try {
            const { postId } = req.body;
            const userId = req.user.userId;

            const useCase = new LikePost();
            const result = await useCase.execute(postId, userId);

            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async unlike(req: any, res: Response) {
        try {
            const { postId } = req.body;
            const userId = req.user.userId;

            const useCase = new UnlikePost();
            const result = await useCase.execute(postId, userId);

            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}