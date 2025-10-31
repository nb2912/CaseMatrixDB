"use client";

import { useEffect, useState } from 'react';
import EvidenceForm from '@/components/forms/EvidenceForm';

export default function EvidencePage({ params }: { params: { caseId: string } }) {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await fetch(`/api/evidence?caseId=${params.caseId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch evidence');
        }
        const data = await res.json();
        setEvidence(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load evidence.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
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
