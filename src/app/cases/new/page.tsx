"use client";
import React from "react";
import CaseForm from "@/components/forms/CaseForm";

export default function NewCasePage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1E3A5F", marginBottom: 16 }}>New Case</h1>
      <CaseForm />
    </div>
  );
}


