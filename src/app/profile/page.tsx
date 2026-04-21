"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Unauthorized Access</h1>
        <p className="text-slate-500 mb-8 font-medium">Please authenticate to access your legal profile.</p>
        <button onClick={() => router.push('/login')} className="btn-primary">Return to Login</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Profile</h1>

        </div>
        <button 
          onClick={() => { logout(); router.push('/login'); }}
          className="btn-secondary text-red-600 border-red-100 hover:bg-red-50 flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Terminate Session
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-6">
          <div className="glass-card p-8 text-center border-slate-200">
             <div className="h-24 w-24 rounded-full bg-accent-500 text-white flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-xl shadow-accent-500/20 uppercase">
              {user.email[0]}
            </div>
            <h2 className="text-xl font-bold text-slate-900 truncate">{user.email.split('@')[0]}</h2>
            <p className="text-xs font-bold text-accent-600 uppercase tracking-widest mt-1 bg-accent-50 px-3 py-1 rounded-full inline-block">{user.role}</p>
          </div>
          
          <div className="glass-card p-6 border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Access Level</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                Verified Account
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                Secure Database Access
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                Admin Panel Access
              </li>
            </ul>
          </div>
        </aside>

        <section className="md:col-span-2 space-y-6">
          <div className="glass-card p-8 border-slate-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Credential Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Email Address</dt>
                <dd className="text-sm font-bold text-slate-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">System Entity ID</dt>
                <dd className="text-sm font-mono text-slate-500 text-xs">{user.id}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Affiliated Role</dt>
                <dd className="text-sm font-bold text-slate-900 capitalize">{user.role}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Account Status</dt>
                <dd className="text-sm font-bold text-emerald-600">Active</dd>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 bg-primary-900 border-none text-white relative overflow-hidden">
             <div className="relative z-10">
              <h3 className="font-bold mb-2">Legal Security Advisory</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Your credentials are tied to all legal actions performed in this system. Always terminate your session when away from your terminal to prevent unauthorized record tampering.
              </p>
             </div>
             <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
