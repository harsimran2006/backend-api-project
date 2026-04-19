import express from "express";
import { LikeController } from "../controllers/LikeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, LikeController.like);
router.delete("/", authMiddleware, LikeController.unlike);

export default router;