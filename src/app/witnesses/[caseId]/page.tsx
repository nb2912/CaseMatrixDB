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
    <div className="container-responsive py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-[#F59E42]">Witnesses for Case #{caseId}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {witnesses.map((w) => (
          <div
            key={w.id}
            className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="text-lg font-semibold text-[#1E3A5F]">{w.name}</div>
            <div className="mt-2 text-sm leading-relaxed text-gray-700">{w.statement}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
