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
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-[#059669]">Register</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-[#059669] hover:bg-emerald-200"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                placeholder="••••••••"
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-[#059669] hover:bg-emerald-200"
              >
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30"
            >
              <option value="user">User</option>
              <option value="lawyer">Lawyer</option>
              <option value="judge">Judge</option>
            </select>
          </div>
          {role === 'lawyer' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">Specialization</label>
              <select
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/30"
              >
                <option value="civil">Civil</option>
                <option value="criminal">Criminal</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full rounded-md bg-[#059669] px-4 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-[#047857] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#059669]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
