import express from "express";
import { CommentController } from "../controllers/CommentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, CommentController.create);

export default router;