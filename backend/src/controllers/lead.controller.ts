import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { createLead, getAllLeads } from "../services/lead.service";

const createLeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  status: z
    .enum([
      "NEW",
      "ENGAGED",
      "PROPOSAL_SENT",
      "CLOSED_WON",
      "CLOSED_LOST",
    ])
    .default("NEW"),
});

export const getLeads = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leads = await getAllLeads();

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

export const addLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = createLeadSchema.parse(req.body);

    const lead = await createLead(
      validatedData.name,
      validatedData.email,
      validatedData.status
    );

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};