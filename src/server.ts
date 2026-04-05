import app from "./app.js";
import { connectDB } from "./infrastructure/database/mongo.js";

const PORT = 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Startup failed:", error);
  process.exit(1);
});