"use client";

import React, { useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Toast from '../shared/Toast';

interface WitnessFormProps {
  caseId: string;
  onWitnessAdded?: () => void;
}

const WitnessForm: React.FC<WitnessFormProps> = ({ caseId, onWitnessAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    statement: '',
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.statement) {
      setToast({ message: 'All fields are required.', type: 'error' });
      return;
    }

    try {
      const res = await fetch('/api/witnesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, caseId }),
      });

      if (res.ok) {
        setToast({ message: 'Witness added successfully!', type: 'success' });
        setFormData({ name: '', statement: '' });
        onWitnessAdded?.();
      } else {
        setToast({ message: 'Failed to add witness.', type: 'error' });
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
        <h2 className="mb-4 text-lg font-semibold text-[#F59E42]">Add Witness</h2>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Witness Name"
          label="Witness Name"
          ariaLabel="Witness Name"
        />
        <div className="mb-4">
          <label htmlFor="statement" className="block mb-1 font-medium text-gray-700">Statement</label>
          <textarea
            id="statement"
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#F59E42] focus:ring-2 focus:ring-[#F59E42]/30"
            aria-label="Witness Statement"
          ></textarea>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#F59E42] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#E76F51] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F59E42]"
          ariaLabel="Add Witness"
        >
          Add Witness
        </Button>
      </form>
    </>
  );
};

export default WitnessForm;
