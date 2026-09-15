import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
  }

  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return res.status(409).json({
      success: false,
      message: "A lead with this email already exists",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};