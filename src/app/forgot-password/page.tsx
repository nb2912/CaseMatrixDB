"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ 
          text: 'Recovery key generated. Check terminal logs (or use the auto-bypass for this demo).', 
          type: 'success' 
        });
        // In this demo, if we get a debugToken, we'll store it so Reset page can "see" it
        if (data.debugToken) {
          localStorage.setItem('temp_reset_token', data.debugToken);
        }
      } else {
        setMessage({ text: data.error || 'Request failed.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'System offline. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-600 via-primary-900 to-accent-600"></div>
      <div className="absolute -left-20 -top-20 h-80 w-80 bg-accent-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-80 w-80 bg-primary-900/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <button 
            onClick={() => router.push('/login')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-accent-600 transition-colors mb-6"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Login
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Key Recovery</h1>
          <p className="text-slate-500 mt-2 font-medium">Request a temporary terminal access key.</p>
        </div>

        <div className="glass-card p-10 border-slate-200">
          {message?.type === 'success' ? (
            <div className="text-center py-4">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                {message.text}
              </p>
              <button
                onClick={() => router.push('/login')}
                className="btn-primary w-full py-4 rounded-xl"
              >
                Return to Terminal
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Registered Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="operator@casematrix.db"
                  className="w-full rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30"
                />
              </div>

              {message?.type === 'error' && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-600 text-xs font-bold text-center">
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-5 rounded-xl shadow-xl shadow-accent-600/20 text-md letter tracking-wide flex items-center justify-center gap-2"
              >
                {loading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>}
                {loading ? 'Dispatched Request...' : 'Recover Access Key'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
