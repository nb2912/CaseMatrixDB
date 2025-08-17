"use client";
import React from 'react';
import EvidenceForm from '@/components/forms/EvidenceForm';

export default function EvidencePage({ params }: { params: { caseId: string } }) {
  return (
    <div className="container-responsive py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-[#6A1B9A]">Evidence for Case #{params.caseId}</h1>
      <div className="mb-8">
        <EvidenceForm caseId={params.caseId} />
      </div>
      {/* ...existing evidence list table can be added here if needed... */}
    </div>
  );
}
