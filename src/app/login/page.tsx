"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { email?: string; password?: string; form?: string } = {};
    if (!email) nextErrors.email = 'Email is required';
    if (!password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      await login(email, password);
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed.';
      setErrors({ form: message });
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
          <div className="h-16 w-16 bg-primary-900 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-900/20">
             <svg className="h-8 w-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 01-6.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Auth</h1>
          <p className="text-slate-500 mt-2 font-medium">Access your CaseMatrixDB terminal.</p>
        </div>

        <div className="glass-card p-10 border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Email Terminal</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="operator@casematrix.db"
                className={`w-full rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border ${errors.email ? 'border-red-300' : 'border-slate-100 focus:border-accent-500/30'}`}
              />
              {errors.email && <p className="mt-2 text-xs font-bold text-red-500 px-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Access Key</label>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => router.push('/forgot-password')}
                    className="text-[10px] font-bold text-slate-400 uppercase hover:text-accent-600 transition-colors"
                  >
                    Forgot Key?
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] font-bold text-accent-600 uppercase hover:underline"
                  >
                    {showPassword ? 'Mask' : 'Reveal'}
                  </button>
                </div>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border ${errors.password ? 'border-red-300' : 'border-slate-100 focus:border-accent-500/30'}`}
              />
              {errors.password && <p className="mt-2 text-xs font-bold text-red-500 px-1">{errors.password}</p>}
            </div>

            {errors.form && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-600 text-xs font-bold text-center">
                {errors.form}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-5 rounded-xl shadow-xl shadow-accent-600/20 text-md letter tracking-wide"
            >
              Initialize Session
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-8">
            <p className="text-sm text-slate-400 font-medium">
              New operator? <button onClick={() => router.push('/register')} className="text-accent-600 font-bold hover:underline">Apply for Access</button>
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}
