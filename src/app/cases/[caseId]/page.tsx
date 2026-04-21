"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { CaseTimeline } from '@/components/cases/CaseTimeline';
import { 
  Gavel, FileText, History, Users, Shield, 
  Download, Eye, ExternalLink, Calendar, MapPin, User,
  Briefcase, AlertTriangle
} from 'lucide-react';

type CaseDetail = {
  id: string;
  title: string;
  status: string;
  priority: string;
  description: string;
  date: string;
  evidence: any[];
  witnesses: any[];
  auditLogs: any[];
};

export default function CaseDetailPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = use(params);
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'evidence' | 'timeline'>('summary');

  const statusMap: Record<string, { label: string; class: string }> = {
    Open: { label: 'Active', class: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
    Closed: { label: 'Closed', class: 'bg-slate-100 text-slate-700 ring-slate-600/10' },
    Pending: { label: 'Pending', class: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  };

  const priorityMap: Record<string, string> = {
    High: 'text-red-600 bg-red-50 ring-red-600/20',
    Medium: 'text-amber-600 bg-amber-50 ring-amber-600/20',
    Low: 'text-blue-600 bg-blue-50 ring-blue-600/20',
  };

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch(`/api/cases/${caseId}`);
        if (!res.ok) throw new Error('Failed to fetch case details');
        const data = await res.json();
        setCaseData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load case details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [caseId]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Retrieving Dossier...</p>
    </div>
  );

  if (error || !caseData) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Record Not Found</p>
      <button onClick={() => router.push('/cases')} className="text-xs font-bold text-accent-600 hover:underline">Return to Archive</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="space-y-6">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <button onClick={() => router.push('/cases')} className="hover:text-accent-600 transition-colors">Archive</button>
          <span>/</span>
          <span className="text-slate-900">Dossier #{caseData.id.slice(0, 8)}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${statusMap[caseData.status]?.class || 'bg-slate-50 text-slate-600 ring-slate-200'}`}>
                {statusMap[caseData.status]?.label || caseData.status}
              </span>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${priorityMap[caseData.priority] || 'bg-slate-50 text-slate-600 ring-slate-200'}`}>
                {caseData.priority} Priority
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl">
              {caseData.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 hover:border-accent-500 transition-all shadow-sm">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-primary-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-primary-900/10">
              Edit Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Tabs System */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'summary', label: 'Summary', icon: <FileText className="h-4 w-4" /> },
          { id: 'evidence', label: 'Evidence', icon: <Briefcase className="h-4 w-4" /> },
          { id: 'timeline', label: 'Timeline', icon: <History className="h-4 w-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {activeTab === 'summary' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="glass-card p-8 border-slate-200">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Procedural Summary</h2>
                <p className="text-lg font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {caseData.description || "No formal description has been entered for this dossier yet."}
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-card p-6 border-slate-200 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exhibits</p>
                    <p className="text-xl font-black text-slate-900">{caseData.evidence.length} Items</p>
                  </div>
                </div>
                <div className="glass-card p-6 border-slate-200 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Witnesses</p>
                    <p className="text-xl font-black text-slate-900">{caseData.witnesses.length} Recorded</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Exhibit Archive</h2>
                <button className="text-xs font-bold text-accent-600 hover:underline flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Add Exhibit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseData.evidence.map((item) => (
                  <div key={item.id} className="glass-card p-5 border-slate-200 group hover:border-accent-500/50 transition-all flex flex-col justify-between h-40">
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary-900 group-hover:text-white transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-accent-600 transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-accent-600 transition-all">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {item.type} • {new Date(item.uploaded).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {caseData.evidence.length === 0 && (
                  <div className="col-span-full py-20 text-center glass-card border-dashed border-slate-200">
                    <Briefcase className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No evidence registered</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="animate-in fade-in duration-500">
              <CaseTimeline logs={caseData.auditLogs} />
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <section className="glass-card p-8 border-slate-200">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Metadata Matrix</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Calendar className="h-5 w-5 text-slate-300 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filing Date</p>
                  <p className="text-sm font-bold text-slate-900">
                    {new Date(caseData.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-slate-300 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jurisdiction</p>
                  <p className="text-sm font-bold text-slate-900">District Court - Civil Branch</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <User className="h-5 w-5 text-slate-300 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registered By</p>
                  <p className="text-sm font-bold text-slate-900">System Admin</p>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 bg-slate-900 text-white relative overflow-hidden">
            <Shield className="h-10 w-10 text-accent-500 mb-4 relative z-10" />
            <h3 className="text-lg font-bold mb-2 relative z-10">Immutable Record</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed relative z-10">
              This dossier is sealed with cryptographic hash protocols. Any unauthorized modification will trigger an immediate system alert.
            </p>
            <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-accent-500/10 rounded-full blur-3xl"></div>
          </section>
        </div>
      </div>
    </div>
  );
}
