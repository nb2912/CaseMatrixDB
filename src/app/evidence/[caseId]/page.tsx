"use client";


import React, { useEffect, useState } from 'react';
import EvidenceForm from '@/components/forms/EvidenceForm';
import { getEvidenceByCaseId } from '@/services/evidence.service';

export default function EvidencePage({ params }: { params: { caseId: string } }) {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEvidenceByCaseId(params.caseId)
      .then(data => setEvidence(data))
      .catch(() => setError('Failed to load evidence.'))
      .finally(() => setLoading(false));
  }, [params.caseId]);

  if (loading) {
    return <div className="container-responsive py-6">Loading evidence...</div>;
  }
  if (error) {
    return <div className="container-responsive py-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container-responsive py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-[#6A1B9A]">Evidence for Case #{params.caseId}</h1>
      <div className="mb-8">
        <EvidenceForm caseId={params.caseId} />
      </div>
      {evidence.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Existing Evidence</h2>
          <ul className="list-disc pl-6">
            {evidence.map((ev, idx) => (
              <li key={ev.id || idx} className="text-gray-700">{ev.name || 'Evidence'} ({ev.type || 'Type'})</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-gray-500">No evidence found for this case.</div>
      )}
    </div>
  );
}
