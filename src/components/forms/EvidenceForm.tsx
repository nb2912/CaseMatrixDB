"use client";
import React, { useState } from "react";

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
      setStatus("Please select a file to upload.");
      return;
    }
    setStatus("Uploading...");
    const data = new FormData();
    data.append("file", formData.file);
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("date", formData.date);
    if (caseId) {
      data.append("caseId", caseId);
    }
    try {
      const res = await fetch("/api/evidence/upload", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setStatus("Upload successful!");
        setFormData({ name: "", type: "", date: "", file: null });
      } else {
        setStatus("Upload failed.");
      }
    } catch (err) {
      setStatus("Upload error.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-100">
      <h2 className="mb-4 text-lg font-semibold text-[#A21CAF]">Add Evidence</h2>

      {/* Evidence Name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Evidence Name"
        className="mb-4 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm outline-none transition focus:border-[#A21CAF] focus:ring-2 focus:ring-[#A21CAF]/30"
      />

      {/* Evidence Type */}
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#A21CAF] focus:ring-2 focus:ring-[#A21CAF]/30"
      >
        <option value="">Select Type</option>
        <option value="Document">Document</option>
        <option value="Photo">Photo</option>
        <option value="Video">Video</option>
        <option value="Audio">Audio</option>
        <option value="Other">Other</option>
      </select>


      {/* Date Collected */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="mb-4 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm outline-none transition focus:border-[#A21CAF] focus:ring-2 focus:ring-[#A21CAF]/30"
      />

      {/* File Upload */}
      <input
        type="file"
        name="file"
        accept="*"
        onChange={handleChange}
        className="mb-4 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm outline-none transition focus:border-[#A21CAF] focus:ring-2 focus:ring-[#A21CAF]/30"
        required
      />

      {/* Save Button */}
      <button
        type="submit"
        className="w-full rounded-md bg-[#A21CAF] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#86198F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A21CAF]"
      >
        Upload Evidence
      </button>
      {status && <div className="mt-2 text-sm text-center">{status}</div>}
    </form>
  );
};

export default EvidenceForm;
