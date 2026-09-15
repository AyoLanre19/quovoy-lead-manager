"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createLead,
  getLeads,
  Lead,
  LeadStatus,
} from "@/lib/api";

const statuses: LeadStatus[] = [
  "NEW",
  "ENGAGED",
  "PROPOSAL_SENT",
  "CLOSED_WON",
  "CLOSED_LOST",
];

const displayStatus: Record<LeadStatus, string> = {
  NEW: "New",
  ENGAGED: "Engaged",
  PROPOSAL_SENT: "Proposal Sent",
  CLOSED_WON: "Closed-Won",
  CLOSED_LOST: "Closed-Lost",
};

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus>("NEW");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    try {
      setError("");
      const data = await getLeads();
      setLeads(data);
    } catch {
      setError("Unable to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await createLead({
        name,
        email,
        status,
      });

      setName("");
      setEmail("");
      setStatus("NEW");

      await loadLeads();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create lead."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Lead Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Lead Manager
          </h1>

          <p className="mt-2 text-slate-500">
            Manage prospects and track their progress.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">Add New Lead</h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-4"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as LeadStatus)
              }
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {displayStatus[item]}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add Lead"}
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Leads ({leads.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-slate-500">
              Loading leads...
            </div>
          ) : leads.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No leads yet. Add your first lead above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Created</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 font-medium">
                        {lead.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {lead.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                          {displayStatus[lead.status]}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(
                          lead.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}