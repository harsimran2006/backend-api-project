import express from "express";
import { AuthController } from "../controllers/AuthController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/me", authMiddleware, (req: any, res) => {
    res.json({
        message: "Protected api authetication",
        user: req.user
    });
});

export const authRoutes = router;