import React, { useState } from "react";

const EvidenceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evidence Submitted:", formData);
    // TODO: Send formData to backend API
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
          color: "#A21CAF",
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        Add Evidence
      </h2>

      {/* Evidence Name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Evidence Name"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #D1D5DB",
          marginBottom: 16,
          fontSize: 15,
        }}
      />

      {/* Evidence Type */}
      <select
        name="type"
        value={formData.type}
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
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #D1D5DB",
          marginBottom: 16,
          fontSize: 15,
        }}
      />

      {/* Save Button */}
      <button
        type="submit"
        style={{
          width: "100%",
          background: "#A21CAF",
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
          ((e.target as HTMLButtonElement).style.backgroundColor = "#86198F")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#A21CAF")
        }
      >
        Save
      </button>
    </form>
  );
};

export default EvidenceForm;
