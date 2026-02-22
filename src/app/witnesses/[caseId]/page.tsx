"use client";

import { useCallback, useEffect, useState, use } from "react";
import { useRouter } from 'next/navigation';
import WitnessForm from '@/components/forms/WitnessForm';

interface WitnessesPageProps {
  params: Promise<{ caseId: string }>;
}

type Witness = { id: string; name: string; statement: string; contact?: string };

export default function WitnessesPage({ params }: WitnessesPageProps) {
  const { caseId } = use(params);
  const router = useRouter();
  const [witnesses, setWitnesses] = useState<Witness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWitnesses = useCallback(async () => {
    try {
      const res = await fetch(`/api/witnesses?caseId=${caseId}`);
      if (!res.ok) throw new Error('Failed to fetch witnesses');
      const data: Witness[] = await res.json();
      setWitnesses(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load witnesses.');
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => { fetchWitnesses(); }, [fetchWitnesses]);

  if (loading) return <div className="p-10 text-center font-medium text-slate-500">Retrieving witness database...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        <button onClick={() => router.push('/cases')} className="hover:text-accent-600 transition-colors">Cases</button>
        <span>/</span>
        <button onClick={() => router.push(`/cases/${caseId}`)} className="hover:text-accent-600 transition-colors">Case Details</button>
        <span>/</span>
        <span className="text-slate-600">Witnesses</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-slate-900">Witness Protection & Records</h1>
          <p className="text-slate-500 mt-1 font-medium leading-relaxed">Repository of verified witnesses and their corresponding legal statements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {witnesses.map((w) => (
              <div key={w.id} className="glass-card p-6 border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{w.name}</h3>
                    <p className="text-xs font-bold text-accent-600">{w.contact || 'No contact info'}</p>
                  </div>
                </div>
                {w.statement && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 italic text-[13px] text-slate-600 font-medium">
                    "{w.statement}"
                  </div>
                )}
              </div>
            ))}
            {witnesses.length === 0 && (
              <div className="col-span-full py-20 text-center glass-card border-dashed border-slate-300 bg-transparent">
                <p className="text-slate-400 font-bold">No registered witnesses for this case.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="h-6 w-1 bg-accent-500 rounded-full"></span>
              Register Witness
            </h2>
            <WitnessForm caseId={caseId} onWitnessAdded={fetchWitnesses} />
          </div>
        </div>
      </div>
    </div>
  );
}
