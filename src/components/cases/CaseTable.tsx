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
    <div className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-100">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-[#1E3A5F]">Case Title</th>
            <th className="px-4 py-3 font-semibold text-[#1E3A5F]">Status</th>
            <th className="px-4 py-3 font-semibold text-[#1E3A5F]">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {cases.map((c, index) => (
            <tr
              key={c.id}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition hover:bg-gray-100 cursor-pointer`}
              onClick={() => router.push(`/cases/${c.id}`)}
            >
              <td className="px-4 py-3 font-medium text-gray-700">{c.title}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: statusColors[c.status] }}>{c.status}</td>
              <td className="px-4 py-3 text-gray-500">{c.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseTable;
