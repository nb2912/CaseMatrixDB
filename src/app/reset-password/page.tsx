"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [token, setToken] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('temp_reset_token') || '' : ''));
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !password || !confirm) return;
    if (password !== confirm) {
      setMessage({ text: 'Access keys do not match.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: 'Access key updated. Re-authentication required.', type: 'success' });
        localStorage.removeItem('temp_reset_token');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setMessage({ text: data.error || 'Reset failed.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Internal sync error. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-600 via-primary-900 to-accent-600"></div>
      <div className="absolute -left-20 -top-20 h-80 w-80 bg-accent-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-80 w-80 bg-primary-900/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Set New Key</h1>
          <p className="text-slate-500 mt-2 font-medium">Define your new terminal access credentials.</p>
        </div>

        <div className="glass-card p-10 border-slate-200">
          {message?.type === 'success' ? (
            <div className="text-center py-4">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-600 font-bold mb-2">Sync Successful</p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {message.text}
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Recovery Key</label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="EX: R4PT0R-K3Y"
                  className="w-full rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2 px-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">New Access Key</label>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[10px] font-bold text-accent-600 uppercase">
                    {showPassword ? 'Hide' : 'Reveal'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Verify New Key</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••"
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
                {loading ? 'Re-writing Key...' : 'Update Terminal Key'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
