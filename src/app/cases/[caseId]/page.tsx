"use client";
import React from 'react';

export default function CaseDetailPage({ params }: { params: { caseId: string } }) {
  // Dummy data for UI
  const caseData = {
    id: params.caseId,
    title: 'State vs. John Doe',
    status: 'Open',
    description: 'A high-profile criminal case involving John Doe.',
    date: '2025-08-01',
  };

  // Status color mapping
  const statusColors: Record<string, { bg: string; text: string }> = {
    Open: { bg: '#3FA796', text: '#FFFFFF' }, // Emerald Green
    Closed: { bg: '#E76F51', text: '#FFFFFF' }, // Soft Red
    Pending: { bg: '#C6A15B', text: '#FFFFFF' }, // Gold
  };

  return (
    <div className="container-responsive py-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[#1E3A5F]">{caseData.title}</h1>
        <span
          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
          style={{ backgroundColor: statusColors[caseData.status].bg }}
        >
          {caseData.status}
        </span>
      </div>

      <div className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-0.5 hover:shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-[#1E3A5F]">Description</h2>
        <p className="text-sm leading-relaxed text-gray-700">{caseData.description}</p>
        <div className="mt-4 text-sm text-gray-500">📅 Date: {caseData.date}</div>
      </div>
    </div>
  );
}
