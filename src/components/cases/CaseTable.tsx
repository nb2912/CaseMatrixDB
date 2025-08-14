"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Case {
  id: string;
  title: string;
  status: "Open" | "Closed" | "Pending";
  date: string;
}

const statusColors: Record<Case["status"], string> = {
  Open: "#059669", // Green
  Closed: "#DC2626", // Red
  Pending: "#F59E42", // Orange
};

const CaseTable = ({ cases }: { cases: Case[] }) => {
  const router = useRouter();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#F3F4F6" }}>
          <tr>
            <th
              style={{
                padding: 16,
                textAlign: "left",
                color: "#1E3A5F",
                fontWeight: 600,
              }}
            >
              Case Title
            </th>
            <th
              style={{
                padding: 16,
                textAlign: "left",
                color: "#1E3A5F",
                fontWeight: 600,
              }}
            >
              Status
            </th>
            <th
              style={{
                padding: 16,
                textAlign: "left",
                color: "#1E3A5F",
                fontWeight: 600,
              }}
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c, index) => (
            <tr
              key={c.id}
              style={{
                borderBottom: index !== cases.length - 1 ? "1px solid #F3F4F6" : "none",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
              }}
              onClick={() => router.push(`/cases/${c.id}`)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                  "#F9FAFB";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                  "transparent";
              }}
            >
              <td style={{ padding: 16, fontWeight: 500, color: "#374151" }}>
                {c.title}
              </td>
              <td
                style={{
                  padding: 16,
                  fontWeight: 600,
                  color: statusColors[c.status],
                }}
              >
                {c.status}
              </td>
              <td style={{ padding: 16, color: "#6B7280" }}>{c.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseTable;
