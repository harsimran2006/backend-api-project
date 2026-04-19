import express from "express";
import { authRoutes } from "./presentation/route/authRoutes.js";
import postRoutes from "./presentation/route/postRoutes.js";
import commentRoutes from "./presentation/route/commentRoutes.js";
import likeRoutes from "./presentation/route/likeRoutes.js";

import adminRoutes from "./presentation/route/adminRoutes.js";




const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/admin", adminRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;