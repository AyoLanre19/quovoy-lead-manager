import { prisma } from "../lib/prisma";

export const getAllLeads = async () => {
  return prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createLead = async (
  name: string,
  email: string,
  status: "NEW" | "ENGAGED" | "PROPOSAL_SENT" | "CLOSED_WON" | "CLOSED_LOST"
) => {
  return prisma.lead.create({
    data: {
      name,
      email,
      status,
    },
  });
};