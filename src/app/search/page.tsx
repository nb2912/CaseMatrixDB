"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

type SearchResult = {
  id: string;
  title?: string;
  name?: string;
  type?: string;
  source: 'Case' | 'Evidence' | 'Witness';
};

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          const combined: SearchResult[] = [
            ...data.cases.map((c: any) => ({ id: c.id, title: c.title, source: 'Case' })),
            ...data.evidence.map((e: any) => ({ id: e.id, title: e.name, type: e.type, source: 'Evidence' })),
            ...data.witnesses.map((w: any) => ({ id: w.id, title: w.name, source: 'Witness' })),
          ];
          setResults(combined);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleNavigate = (r: SearchResult) => {
    if (r.source === 'Case') router.push(`/cases/${r.id}`);
    else if (r.source === 'Evidence') router.push(`/evidence/${r.id}`); // This might need a caseId context or similar
    else if (r.source === 'Witness') router.push(`/witnesses/${r.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Legal Database Search</h1>
        <p className="text-slate-500 mt-1 font-medium">Query the centralized archive for specific records.</p>
      </header>

      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          {loading ? (
             <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-accent-600"></div>
          ) : (
            <svg className="h-6 w-6 text-slate-400 group-focus-within:text-accent-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        <input
          type="text"
          placeholder="Search by case title, witness name, or exhibit label..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white rounded-2xl border border-slate-200 pl-14 pr-6 py-5 text-lg font-medium text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500/30 transition-all shadow-sm"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          {results.length > 0 ? `${results.length} matching indices found` : 'Search Results'}
        </h2>
        
        <div className="glass-card divide-y divide-slate-100 border-slate-200">
          {results.length > 0 ? (
            results.map((r) => (
              <button
                key={`${r.source}-${r.id}`}
                onClick={() => handleNavigate(r)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-slate-900 group-hover:text-accent-600 transition-colors truncate">
                    {r.title || r.name}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Index Type: <span className="text-accent-600">{r.source}</span> {r.type ? `• ${r.type}` : ''}
                  </p>
                </div>
                <svg className="h-5 w-5 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-500 font-bold">
                {query.trim() ? "No matching records found in database." : "Enter query parameters to begin search."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
