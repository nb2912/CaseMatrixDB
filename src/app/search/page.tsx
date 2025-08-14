"use client";

import React, { useState } from "react";

const dummyResults = [
  { id: "1", title: "State vs. John Doe", type: "Case" },
  { id: "2", title: "Photo of Crime Scene", type: "Evidence" },
  { id: "3", title: "Jane Smith", type: "Witness" },
  { id: "4", title: "Court Hearing Transcript", type: "Document" },
  { id: "5", title: "State vs. Jane Doe", type: "Case" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredResults = dummyResults.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container-responsive py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-[#DC2626]">Search</h1>
      <input
        type="text"
        placeholder="Search cases, evidence, witnesses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30"
      />

      <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-100">
        <h2 className="mb-3 text-lg font-semibold text-[#1E3A5F]">Results</h2>
        {filteredResults.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {filteredResults.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3 transition hover:bg-gray-50">
                <span className="font-medium text-gray-700">{r.title}</span>
                <span className="text-xs text-gray-500">{r.type}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}
