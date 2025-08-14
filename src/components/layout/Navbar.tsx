"use client";
import React from "react";

const Navbar = () => {
  return (
    <nav
      style={{
        height: "64px",
        background: "#1E3A5F",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo / Brand */}
      <h1 style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: 1 }}>
        CaseMatrixDB
      </h1>

      {/* Right side actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <input
          type="text"
          placeholder="Search cases..."
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            width: "180px",
          }}
        />
        <button
          style={{
            background: "#2563EB",
            color: "#fff",
            padding: "8px 14px",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#1E40AF")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#2563EB")}
        >
          + New Case
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
