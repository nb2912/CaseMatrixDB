"use client";










import React, { useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Toast from '../shared/Toast';
import { useAuth } from '@/context/AuthContext';

const CaseForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    date: '',
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.status || !formData.date) {
      setToast({ message: 'All fields are required.', type: 'error' });
      return;
    }
    if (!user) {
      setToast({ message: 'You must be logged in to create a case.', type: 'error' });
      return;
    }
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId: user.id }),
      });
      if (res.ok) {
        setToast({ message: 'Case saved successfully!', type: 'success' });
        setFormData({ title: '', status: '', date: '' });
      } else {
        setToast({ message: 'Failed to save case.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'An error occurred.', type: 'error' });
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
      <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-[#1E3A5F]">Add / Edit Case</h2>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Case Title"
          label="Case Title"
          ariaLabel="Case Title"
        />
        <div className="mb-4">
          <label htmlFor="status" className="block mb-1 font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            aria-label="Status"
          >
            <option value="">Select Status</option>
            <option value="Open" style={{ color: '#059669' }}>Open</option>
            <option value="Pending" style={{ color: '#F59E42' }}>Pending</option>
            <option value="Closed" style={{ color: '#DC2626' }}>Closed</option>
          </select>
        </div>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          label="Date"
          ariaLabel="Date"
        />
        <Button
          type="submit"
          className="w-full bg-[#2563EB] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
          ariaLabel="Save Case"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default CaseForm;
