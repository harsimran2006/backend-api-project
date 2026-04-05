import type { Request, Response } from "express";
import { RegisterUser } from "../../infrastructure/auth/RegisterUser.js";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;

            const useCase = new RegisterUser();
            const user = await useCase.execute(username, email, password);

            res.status(201).json(user);
        } catch (error: any) {
            console.error("AuthController.register error", error);
            res.status(400).json({ message: error.message });
        }
    }
}