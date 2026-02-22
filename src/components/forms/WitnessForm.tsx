"use client";

import React, { useState } from 'react';
import Toast from '../shared/Toast';

interface WitnessFormProps {
  caseId: string;
  onWitnessAdded?: () => void;
}

const WitnessForm: React.FC<WitnessFormProps> = ({ caseId, onWitnessAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    statement: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.statement) {
      setToast({ message: 'Witness identity and statement are required.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/witnesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, caseId }),
      });

      if (res.ok) {
        setToast({ message: 'Witness successfully recorded in dossier.', type: 'success' });
        setFormData({ name: '', statement: '', contact: '' });
        onWitnessAdded?.();
      } else {
        setToast({ message: 'Failed to record witness.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Database connection error.', type: 'error' });
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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Legal Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name as per ID"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
          />
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Info</label>
           <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone number or Email"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sworn Statement</label>
          <textarea
            name="statement"
            required
            rows={4}
            value={formData.statement}
            onChange={handleChange}
            placeholder="Recorded testimony..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? (
             <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
          ) : (
            <svg className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          )}
          {loading ? 'Processing...' : 'Register Witness'}
        </button>
      </form>
    </>
  );
};

export default WitnessForm;
