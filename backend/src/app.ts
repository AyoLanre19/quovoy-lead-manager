import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import leadRoutes from "./routes/lead.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Lead Manager API is running",
  });
});

app.use("/leads", leadRoutes);

app.use(errorHandler);

export default app;