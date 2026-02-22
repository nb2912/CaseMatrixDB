"use client";
import React from 'react';
import { useRouter } from 'next/navigation';





import { useEffect, useState } from 'react';

type CaseSummary = {
  id: string;
  title: string;
  status: 'Open' | 'Closed' | 'In Progress' | string;
  date: string;
};

export default function CasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const statusMap: Record<string, { label: string; class: string }> = {
    Open: { label: 'Open', class: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
    Closed: { label: 'Closed', class: 'bg-slate-100 text-slate-700 ring-slate-600/20' },
    'In Progress': { label: 'In Progress', class: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
    Pending: { label: 'Pending', class: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  };

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch('/api/cases');
        if (!res.ok) throw new Error('Failed to fetch cases');
        const data: CaseSummary[] = await res.json();
        setCases(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load cases.');
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  if (loading) return <div className="p-10 text-center font-medium text-slate-500">Loading case records...</div>;
  if (error) return <div className="p-10 text-center font-medium text-red-600 bg-red-50 rounded-xl">{error}</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Case Records</h1>
          <p className="text-slate-500 mt-1 font-medium">Access and manage all legal proceedings in the system.</p>
        </div>
        <button 
          onClick={() => router.push('/cases/new')}
          className="btn-primary w-fit flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Register New Case
        </button>
      </div>

      <div className="glass-card overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Case Title</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Filing Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {cases.map((c) => (
                <tr
                  key={c.id}
                  className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => router.push(`/cases/${c.id}`)}
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-accent-600 transition-colors">
                      {c.title}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">#{c.id.slice(0, 8)}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${statusMap[c.status]?.class || 'bg-slate-50 text-slate-600 ring-slate-500/10'}`}>
                      {statusMap[c.status]?.label || c.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-600">
                      {new Date(c.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-slate-300 group-hover:text-slate-600 transition-colors">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {cases.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-slate-500 font-medium">No results found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
