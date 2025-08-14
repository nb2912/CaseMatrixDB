"use client";
import React, { useState } from "react";

const CaseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: Send data to backend
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-100">
      <h2 className="mb-4 text-lg font-semibold text-[#1E3A5F]">Add / Edit Case</h2>

      {/* Case Title */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Case Title"
        className="mb-4 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30"
      />

      {/* Status Dropdown */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
      >
        <option value="">Select Status</option>
        <option value="Open" style={{ color: "#059669" }}>
          Open
        </option>
        <option value="Pending" style={{ color: "#F59E42" }}>
          Pending
        </option>
        <option value="Closed" style={{ color: "#DC2626" }}>
          Closed
        </option>
      </select>

      {/* Date Picker */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="mb-4 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-md bg-[#2563EB] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
      >
        Save
      </button>
    </form>
  );
};

export default CaseForm;
