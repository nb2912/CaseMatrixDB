"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

type CaseDetail = {
  id: string;
  title: string;
  status: 'Open' | 'Closed' | 'Pending' | string;
  description: string;
  date: string;
};

export default function CaseDetailPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = use(params);
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const statusMap: Record<string, { label: string; class: string }> = {
    Open: { label: 'Active', class: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
    Closed: { label: 'Closed', class: 'bg-slate-100 text-slate-700 ring-slate-600/10' },
    'In Progress': { label: 'In Progress', class: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  };

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch(`/api/cases/${caseId}`);
        if (!res.ok) throw new Error('Failed to fetch case details');
        const data: CaseDetail = await res.json();
        setCaseData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load case details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [caseId]);

  if (loading) return <div className="p-10 text-center font-medium text-slate-500">Retrieving case dossier...</div>;
  if (error || !caseData) return <div className="p-10 text-center text-red-600 font-medium">Record not found.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        <button onClick={() => router.push('/cases')} className="hover:text-accent-600 transition-colors">Cases</button>
        <span>/</span>
        <span className="text-slate-600">Details</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${statusMap[caseData.status]?.class || 'bg-slate-50 text-slate-600'}`}>
              {statusMap[caseData.status]?.label || caseData.status}
            </span>
            <span className="text-xs font-mono text-slate-400">ID: {caseData.id}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900">{caseData.title}</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm px-6">Edit Archive</button>
          <button className="btn-primary text-sm px-6">Export PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card p-8 border-slate-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Case Summary</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-lg font-medium">{caseData.description || 'No description provided for this case.'}</p>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => router.push(`/evidence/${caseId}`)}
              className="p-6 glass-card border-slate-200 hover:border-accent-500/50 transition-all text-left flex items-start gap-4"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Evidence Archive</h3>
                <p className="text-sm text-slate-500 font-medium">View and manage all exhibits.</p>
              </div>
            </button>
            <button 
              onClick={() => router.push(`/witnesses/${caseId}`)}
              className="p-6 glass-card border-slate-200 hover:border-accent-500/50 transition-all text-left flex items-start gap-4"
            >
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Witness List</h3>
                <p className="text-sm text-slate-500 font-medium">Recorded statements and contacts.</p>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section className="glass-card p-6 border-slate-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Case Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-tight">Filing Date</dt>
                <dd className="text-sm font-bold text-slate-900">
                   {new Date(caseData.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </dd>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-tight">Jurisdiction</dt>
                <dd className="text-sm font-bold text-slate-900">District Court - Civil Branch</dd>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-tight">Primary Attorney</dt>
                <dd className="text-sm font-bold text-accent-600 hover:underline cursor-pointer">Unassigned</dd>
              </div>
            </dl>
          </section>

          <section className="bg-primary-900 rounded-2xl p-6 text-white text-center">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Secure Record</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">This record is encrypted and restricted to authorized legal personnel only.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
