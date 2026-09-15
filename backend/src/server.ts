import dotenv from "dotenv";
import app from "./app";
import { prisma } from "./lib/prisma";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`Lead Manager API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();