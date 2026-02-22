"use client";

import React, { useState } from 'react';
import Toast from '../shared/Toast';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const CaseForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    date: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.status || !formData.date) {
      setToast({ message: 'All mandatory fields must be completed.', type: 'error' });
      return;
    }
    if (!user) {
      setToast({ message: 'Authentication required for record creation.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user.id }),
      });
      if (res.ok) {
        setToast({ message: 'New dossier registered successfully.', type: 'success' });
        setFormData({ title: '', status: '', date: '', description: '' });
        setTimeout(() => router.push('/cases'), 1500);
      } else {
        setToast({ message: 'Failed to synchronize record with matrix.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Central database connection error.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Case Narrative / Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. State vs. Anderson - Property Dispute"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Detailed Briefing</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide initial details of the legal matter..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Operational Status</label>
            <select
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium appearance-none"
            >
              <option value="">Select Priority</option>
              <option value="Open">Active Litigation</option>
              <option value="Pending">Preliminary Processing</option>
              <option value="In Progress">Discovery / Investigation</option>
              <option value="Closed">Archived / Resolved</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Filing Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 mt-6 flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? (
             <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
          ) : (
            <svg className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {loading ? 'Synchronizing...' : 'Register Formal Case dossier'}
        </button>
      </form>
    </>
  );
};

export default CaseForm;
