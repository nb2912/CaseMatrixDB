"use client";
import React from 'react';

const evidenceList = [
  { id: 'e1', name: 'Photo of Crime Scene', type: 'Image', uploaded: '2025-08-01' },
  { id: 'e2', name: 'Witness Statement', type: 'Document', uploaded: '2025-08-02' },
];

export default function EvidencePage({ params }: { params: { caseId: string } }) {

  const typeColors: Record<string, { bg: string; text: string }> = {
    Image: { bg: '#3FA796', text: '#FFFFFF' },     // Emerald green
    Document: { bg: '#1E3A5F', text: '#FFFFFF' },  // Deep navy
  };

  return (
    <div className="container-responsive py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-[#6A1B9A]">Evidence for Case #{params.caseId}</h1>
      <div className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-100">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold text-[#6A1B9A]">Name</th>
              <th className="px-4 py-3 font-semibold text-[#6A1B9A]">Type</th>
              <th className="px-4 py-3 font-semibold text-[#6A1B9A]">Uploaded</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {evidenceList.map((e, idx) => (
              <tr key={e.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition hover:bg-gray-100`}>
                <td className="px-4 py-3 font-medium text-gray-700">{e.name}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: typeColors[e.type].bg }}
                  >
                    {e.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{e.uploaded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
