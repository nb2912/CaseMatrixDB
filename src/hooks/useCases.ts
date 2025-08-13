import { useState } from "react";

export interface Case {
  id: string;
  title: string;
  status: "Open" | "Closed" | "In Progress";
  date: string; // ISO date format
}

export const useCases = () => {
  const [cases, setCases] = useState<Case[]>([
    { id: "1", title: "State vs. John Doe", status: "Open", date: "2025-08-01" },
    { id: "2", title: "Acme Corp. vs. Smith", status: "Closed", date: "2025-07-15" },
    { id: "3", title: "People vs. Jane Roe", status: "In Progress", date: "2025-08-10" },
  ]);

  const addCase = (newCase: Case) => setCases((prev) => [...prev, newCase]);

  const updateCase = (id: string, updatedCase: Partial<Case>) =>
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedCase } : c))
    );

  const deleteCase = (id: string) =>
    setCases((prev) => prev.filter((c) => c.id !== id));

  return { cases, setCases, addCase, updateCase, deleteCase };
};
