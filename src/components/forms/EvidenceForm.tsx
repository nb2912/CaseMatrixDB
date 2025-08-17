"use client";
import React, { useState } from "react";
import Input from '../shared/Input';
import Button from '../shared/Button';
import Toast from '../shared/Toast';

interface EvidenceFormProps {
  caseId?: string;
}

const EvidenceForm: React.FC<EvidenceFormProps> = ({ caseId }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    file: null as File | null,
  });
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    setStatus('Uploading...');
    const data = new FormData();
    data.append('file', formData.file);
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('date', formData.date);
    if (caseId) {
      data.append('caseId', caseId);
    }
    try {
      const res = await fetch('/api/evidence/upload', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setToast({ message: 'Upload successful!', type: 'success' });
        setFormData({ name: '', type: '', date: '', file: null });
      } else {
        setToast({ message: 'Upload failed.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Upload error.', type: 'error' });
    }
    setStatus('');
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
        <h2 className="mb-4 text-lg font-semibold text-[#A21CAF]">Add Evidence</h2>

        {/* Evidence Name */}
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Evidence Name"
          label="Evidence Name"
          ariaLabel="Evidence Name"
        />

        {/* Evidence Type */}
        <div className="mb-4">
          <label htmlFor="type" className="block mb-1 font-medium text-gray-700">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#A21CAF] focus:ring-2 focus:ring-[#A21CAF]/30"
            aria-label="Type"
          >
            <option value="">Select Type</option>
            <option value="Document">Document</option>
            <option value="Photo">Photo</option>
            <option value="Video">Video</option>
            <option value="Audio">Audio</option>
            <option value="Other">Other</option>
          </select>
        </div>


        {/* Date Collected */}
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          label="Date Collected"
          ariaLabel="Date Collected"
        />

        {/* File Upload */}
        <Input
          type="file"
          name="file"
          accept="*"
          onChange={handleChange}
          label="Upload File"
          ariaLabel="Upload File"
          required
        />

        {/* Save Button */}
        <Button
          type="submit"
          className="w-full bg-[#A21CAF] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#86198F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A21CAF]"
          ariaLabel="Upload Evidence"
        >
          Upload Evidence
        </Button>
        {status && <div className="mt-2 text-sm text-center">{status}</div>}
      </form>
    </>
  );
};

export default EvidenceForm;
