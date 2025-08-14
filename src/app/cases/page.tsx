"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const cases = [
  { id: '1', title: 'State vs. John Doe', status: 'Open', date: '2025-08-01' },
  { id: '2', title: 'Acme Corp. vs. Smith', status: 'Closed', date: '2025-07-15' },
  { id: '3', title: 'People vs. Jane Roe', status: 'In Progress', date: '2025-08-10' },
];

export default function CasesPage() {
  const router = useRouter();

  const statusColors: Record<string, { bg: string; text: string }> = {
    Open: { bg: '#3FA796', text: '#FFFFFF' },         // Emerald Green
    Closed: { bg: '#E76F51', text: '#FFFFFF' },       // Soft Red
    'In Progress': { bg: '#C6A15B', text: '#FFFFFF' } // Gold
  };

  return (
    <div className="container-responsive py-6">
      <h1 className="mb-4 text-3xl font-extrabold text-[#1E3A5F]">All Cases</h1>

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
            {cases.map((c, idx) => (
              <tr
                key={c.id}
                className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition hover:bg-gray-100 cursor-pointer`}
                onClick={() => router.push(`/cases/${c.id}`)}
              >
                <td className="px-4 py-3 font-medium text-gray-700">{c.title}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: statusColors[c.status].bg }}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
