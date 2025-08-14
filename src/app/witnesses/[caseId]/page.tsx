"use client";
"use client";

import React, { useState } from "react";

const initialWitnesses = [
  { id: "w1", name: "Jane Smith", statement: "Saw the suspect at the scene." },
  { id: "w2", name: "Bob Lee", statement: "Heard loud noises around midnight." },
];

interface WitnessesPageProps {
  params: { caseId: string };
}

export default function WitnessesPage({ params }: WitnessesPageProps) {
  const { caseId } = params;
  const [witnesses] = useState(initialWitnesses);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 32 }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#F59E42",
          marginBottom: 24,
        }}
      >
        Witnesses for Case #{caseId}
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {witnesses.map((w) => (
          <div
            key={w.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              padding: 24,
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "#1E3A5F",
                fontSize: 18,
              }}
            >
              {w.name}
            </div>
            <div
              style={{
                color: "#374151",
                marginTop: 8,
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {w.statement}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
