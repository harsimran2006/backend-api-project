import express from "express";
import { AuthController } from "../controllers/AuthController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/me", authMiddleware, (req: any, res) => {
    res.json({
        message: "Protected api authetication",
        user: req.user
    });
});

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
        res.json({ message: "Welcome Admin!" });
    }
);

export const authRoutes = router;