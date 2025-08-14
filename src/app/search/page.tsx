"use client";
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
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 32 }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#DC2626",
          marginBottom: 24,
        }}
      >
        Search
      </h1>

      <input
        type="text"
        placeholder="Search cases, evidence, witnesses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 8,
          border: "1px solid #D1D5DB",
          marginBottom: 24,
          fontSize: 16,
          outline: "none",
          transition: "border-color 0.2s ease-in-out",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
        onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          padding: 24,
        }}
      >
        <h2
          style={{
            color: "#1E3A5F",
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Results
        </h2>

        {filteredResults.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredResults.map((r) => (
              <li
                key={r.id}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #E5E7EB",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F9FAFB")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span style={{ fontWeight: 500, color: "#374151" }}>
                  {r.title}
                </span>
                <span style={{ color: "#6B7280", fontSize: 14 }}>
                  {r.type}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#6B7280", fontSize: 16 }}>No results found.</p>
        )}
      </div>
    </div>
  );
}
