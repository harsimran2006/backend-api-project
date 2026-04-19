import express from "express";
import { AdminController } from "../controllers/AdminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/posts", authMiddleware, adminMiddleware, AdminController.getAllPosts);

router.delete(
    "/posts/:postId",
    authMiddleware,
    adminMiddleware,
    AdminController.deletePost
);

export default router;