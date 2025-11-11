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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#1E3A5F] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-[#2563EB]">Login</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-[#1E3A5F]">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`mt-1 w-full rounded-md bg-gray-50 px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/40 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200 border' : 'border border-indigo-200'}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E3A5F]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`mt-1 w-full rounded-md bg-gray-50 px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/40 ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-200 border' : 'border border-indigo-200'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-[#2563EB] hover:bg-indigo-200"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          {errors.form && <div className="text-red-600 text-sm text-center">{errors.form}</div>}
          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-[#2563EB] to-[#1E3A5F] px-4 py-3 text-sm font-extrabold text-white shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
