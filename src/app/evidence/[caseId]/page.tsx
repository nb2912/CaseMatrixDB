"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import EvidenceForm from '@/components/forms/EvidenceForm';

type EvidenceItem = { id: string; name: string; type: string; description?: string; uploaded: string };

export default function EvidencePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = use(params);
  const router = useRouter();
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvidence = async () => {
    try {
      const res = await fetch(`/api/evidence?caseId=${caseId}`);
      if (!res.ok) throw new Error('Failed to fetch evidence');
      const data: EvidenceItem[] = await res.json();
      setEvidence(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load evidence.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, [caseId]);

  if (loading) return <div className="p-10 text-center font-medium text-slate-500">Scanning evidence vaults...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        <button onClick={() => router.push('/cases')} className="hover:text-accent-600 transition-colors">Cases</button>
        <span>/</span>
        <button onClick={() => router.push(`/cases/${caseId}`)} className="hover:text-accent-600 transition-colors">Case Details</button>
        <span>/</span>
        <span className="text-slate-600">Evidence</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-slate-900">Evidence Archive</h1>
          <p className="text-slate-500 mt-1 font-medium leading-relaxed">Systematic record of all exhibits, documents, and media associated with this case.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {evidence.map((e) => (
              <div key={e.id} className="glass-card p-5 border-slate-200 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-accent-50 transition-colors">
                    <svg className="h-6 w-6 text-slate-400 group-hover:text-accent-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{e.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{e.type}</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Uploaded: {new Date(e.uploaded || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
                {e.description && (
                  <p className="mt-4 text-[13px] text-slate-600 line-clamp-2 font-medium leading-relaxed">
                    {e.description}
                  </p>
                )}
              </div>
            ))}
            {evidence.length === 0 && (
              <div className="col-span-full py-20 text-center glass-card border-dashed border-slate-300 bg-transparent">
                <p className="text-slate-400 font-bold">No evidence records found.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="h-6 w-1 bg-accent-500 rounded-full"></span>
              Register Evidence
            </h2>
            <EvidenceForm caseId={caseId} onCreated={fetchEvidence} />
          </div>
        </div>
      </div>
    </div>
  );
}
