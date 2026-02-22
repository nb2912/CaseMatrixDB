"use client";
import React, { useState } from "react";
import Input from '../shared/Input';
import Button from '../shared/Button';
import Toast from '../shared/Toast';

interface EvidenceFormProps {
  caseId?: string;
  onCreated?: () => void;
}

const EvidenceForm: React.FC<EvidenceFormProps> = ({ caseId, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    description: "",
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, file: target.files ? target.files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setToast({ message: 'Please select a file to upload.', type: 'error' });
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append('file', formData.file);
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('date', formData.date);
    if (caseId) data.append('caseId', caseId);

    try {
      const res = await fetch('/api/evidence/upload', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setToast({ message: 'Exhibit successfully registered in archive.', type: 'success' });
        setFormData({ name: '', type: '', date: '', description: '', file: null });
        onCreated?.();
      } else {
        setToast({ message: 'Archive registration failed.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Archive connection error.', type: 'error' });
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
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Exhibit Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. CCTV Footage - Entry A"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
          />
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Evidence Type</label>
          <select
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium appearance-none"
          >
            <option value="">Select Category</option>
            <option value="Document">Paper/Document</option>
            <option value="Photo">Photograph</option>
            <option value="Video">Video Recording</option>
            <option value="Audio">Audio Clip</option>
            <option value="Physical">Physical Object</option>
            <option value="Other">Miscellaneous</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description / Context</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide brief context for this exhibit..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Collection Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500/30 transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Source File</label>
            <input
              type="file"
              name="file"
              required
              onChange={handleChange}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-accent-50 file:text-accent-700 hover:file:bg-accent-100 transition-all"
            />
          </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
          {loading ? 'Processing...' : 'Register Archive Entry'}
        </button>
      </form>
    </>
  );
};

export default EvidenceForm;
