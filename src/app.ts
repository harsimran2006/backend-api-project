import express from "express";
import { authRoutes } from "./presentation/route/authRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health endpoint (keep this!)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;