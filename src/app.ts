import express from "express";
import { authRoutes } from "./presentation/route/authRoutes.js";
import postRoutes from "./presentation/route/postRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Health endpoint (keep this!)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;