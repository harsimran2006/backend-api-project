import express from "express";
import { PostController } from "../controllers/PostController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, PostController.create);

export default router;
