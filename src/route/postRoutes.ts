import express from "express";
import { PostController } from "../controllers/PostController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, PostController.create);
router.put("/", authMiddleware, PostController.edit);
router.delete("/", authMiddleware, PostController.delete);
router.get("/", PostController.getAll);
export default router;
