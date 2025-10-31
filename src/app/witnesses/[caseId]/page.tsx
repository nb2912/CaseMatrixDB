"use client";

import { useEffect, useState } from "react";

interface WitnessesPageProps {
  params: { caseId: string };
}

export default function WitnessesPage({ params }: WitnessesPageProps) {
  const { caseId } = params;
  const [witnesses, setWitnesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWitnesses = async () => {
      try {
        const res = await fetch(`/api/witnesses?caseId=${caseId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch witnesses');
        }
        const data = await res.json();
        setWitnesses(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load witnesses.');
      } finally {
        setLoading(false);
      }
    };
    fetchWitnesses();
  }, [caseId]);

  if (loading) {
    return <div className="container-responsive py-6">Loading witnesses...</div>;
  }
  if (error) {
    return <div className="container-responsive py-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container-responsive py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-[#F59E42]">Witnesses for Case #{caseId}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {witnesses.length > 0 ? witnesses.map((w) => (
          <div
            key={w.id}
            className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="text-lg font-semibold text-[#1E3A5F]">{w.name}</div>
            <div className="mt-2 text-sm leading-relaxed text-gray-700">{w.statement}</div>
          </div>
        )) : <div className="text-gray-500">No witnesses found for this case.</div>}
      </div>
    </div>
  );
}
