"use client";
import React from "react";
import EvidenceForm from "@/components/forms/EvidenceForm";

export default function NewEvidencePage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#6A1B9A", marginBottom: 16 }}>Upload Evidence</h1>
      <EvidenceForm />
    </div>
  );
}


