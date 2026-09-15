const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type LeadStatus =
  | "NEW"
  | "ENGAGED"
  | "PROPOSAL_SENT"
  | "CLOSED_WON"
  | "CLOSED_LOST";

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
}

export const getLeads = async (): Promise<Lead[]> => {
  const response = await fetch(`${API_URL}/leads`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  const result = await response.json();

  return result.data;
};

export const createLead = async (payload: {
  name: string;
  email: string;
  status: LeadStatus;
}): Promise<Lead> => {
  const response = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create lead");
  }

  return result.data;
};