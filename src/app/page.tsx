"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [counts, setCounts] = useState({ cases: 0, witnesses: 0, evidence: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [casesRes, witnessesRes, evidenceRes] = await Promise.all([
          fetch('/api/cases'),
          fetch('/api/witnesses'),
          fetch('/api/evidence')
        ]);
        
        const cases = casesRes.ok ? await casesRes.json() : [];
        const witnesses = witnessesRes.ok ? await witnessesRes.json() : [];
        const evidence = evidenceRes.ok ? await evidenceRes.json() : [];

        setCounts({
          cases: Array.isArray(cases) ? cases.length : 0,
          witnesses: Array.isArray(witnesses) ? witnesses.length : 0,
          evidence: Array.isArray(evidence) ? evidence.length : 0,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const stats = [
    { label: "Active Cases", value: counts.cases, icon: "⚖️" },
    { label: "Total Evidence", value: counts.evidence, icon: "📁" },
    { label: "Witnesses", value: counts.witnesses, icon: "👥" },
    { label: "System Status", value: "Active", icon: "🌐" },
  ];

  const quickLinks = [
    {
      title: "View All Cases",
      description: "Manage and track all ongoing legal matters.",
      path: "/cases",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Register New Case",
      description: "Initialize a new legal dossier in the matrix.",
      path: "/cases/new",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      title: "Search Database",
      description: "Find cases, witnesses, or evidence quickly.",
      path: "/search",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Legal Assistant",
      description: "Get real-time clarity on legal procedures.",
      path: "/chatbot",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
        <p className="text-slate-500 mt-1 font-medium">
          {user ? `Welcome back, ${user.email.split('@')[0]}. Monitoring active dossiers.` : "Verifying system permissions..."}
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">
              {loading ? "..." : stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="h-1 w-6 bg-accent-500 rounded-full"></span>
            Operational Commands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => router.push(link.path)}
                className="group p-8 text-left glass-card border-slate-200 hover:border-accent-500/50 hover:bg-white transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6 group-hover:bg-primary-900 group-hover:text-accent-500 transition-all">
                  {link.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{link.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{link.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Security Notice / Status */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="h-1 w-6 bg-accent-500 rounded-full"></span>
            Security Advisory
          </h2>
          <div className="glass-card p-8 border-slate-200 bg-primary-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-4 text-emerald-400 flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                 Active Session Secure
              </h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                All data transmission is encrypted. Case records are immutable once sealed. Please ensure you sign out from your terminal when leaving.
              </p>
            
            </div>
            <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-accent-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
