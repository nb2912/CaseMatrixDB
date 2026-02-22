"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('user');
  const [specialization, setSpecialization] = useState('civil');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, specialization: role === 'lawyer' ? specialization : undefined }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Registration failed.');
        return;
      }
      // Auto-login after registration
      await login(email, password);
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed.';
      setError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-600 via-primary-900 to-accent-600"></div>
      <div className="absolute -left-20 -top-20 h-80 w-80 bg-accent-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-80 w-80 bg-primary-900/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Operator Application</h1>
          <p className="text-slate-500 mt-2 font-medium">Request professional access to CaseMatrixDB records.</p>
        </div>

        <div className="glass-card p-10 border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@firm.legal"
                  className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30"
                />
              </div>

              <div>
                 <div className="flex items-center justify-between mb-2 px-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Secret Key</label>
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
                  className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 px-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Verify Key</label>
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[10px] font-bold text-accent-600 uppercase">
                    {showConfirm ? 'Hide' : 'Reveal'}
                  </button>
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Designated Role</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30 appearance-none"
                >
                  <option value="user">Public Visitor</option>
                  <option value="lawyer">Legal Counsel</option>
                  <option value="judge">Judiciary official</option>
                </select>
              </div>

              {role === 'lawyer' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Specialization</label>
                  <select
                    value={specialization}
                    onChange={e => setSpecialization(e.target.value)}
                    className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-accent-500/10 border border-slate-100 focus:border-accent-500/30 appearance-none"
                  >
                    <option value="civil">Civil Litigation</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="other">General Practice</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 pt-8">
                   Registration auto-verified
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-600 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-5 rounded-xl shadow-xl shadow-accent-600/20 text-md letter tracking-wide mt-4"
            >
              Verify & Authorize Account
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-8">
            <p className="text-sm text-slate-400 font-medium">
              Already authorized? <button onClick={() => router.push('/login')} className="text-accent-600 font-bold hover:underline">Access Terminal</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
