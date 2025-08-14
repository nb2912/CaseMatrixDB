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
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        padding: 24,
      }}
    >
      <h2
        style={{
          color: "#1E3A5F",
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        Add / Edit Case
      </h2>

      {/* Case Title */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Case Title"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #D1D5DB",
          marginBottom: 16,
          fontSize: 15,
        }}
      />

      {/* Status Dropdown */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #D1D5DB",
          marginBottom: 16,
          fontSize: 15,
          backgroundColor: "#fff",
        }}
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
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #D1D5DB",
          marginBottom: 16,
          fontSize: 15,
        }}
      />

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          width: "100%",
          background: "#2563EB",
          color: "#fff",
          padding: 14,
          border: "none",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#1D4ED8")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#2563EB")
        }
      >
        Save
      </button>
    </form>
  );
};

export default CaseForm;
