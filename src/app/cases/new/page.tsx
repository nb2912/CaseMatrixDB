"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import CaseForm from "@/components/forms/CaseForm";

export default function NewCasePage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Register New Case</h1>
          <p className="text-slate-500 mt-1 font-medium">Initialize a new legal dossier in the matrix.</p>
        </div>
        <button 
          onClick={() => router.push('/cases')}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Archives
        </button>
      </header>

      <div className="glass-card p-8 border-slate-200">
        <CaseForm />
      </div>

      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center shrink-0">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">Registration Notice</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
            Once a case is registered, it will be assigned a unique system ID. Initial descriptions can be updated later by authorized personnel. Ensure all parties&apos; information is accurate before submission.
          </p>
        </div>
      </div>
    </div>
  );
}


