"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CalendarWidget = dynamic(() => import("@/components/calender/CalendarWidget"), { ssr: false });

export default function CalendarClientPage() {
  const [hearingDates, setHearingDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHearingDates = async () => {
      try {
        const res = await fetch('/api/hearings');
        if (!res.ok) {
          throw new Error('Failed to fetch hearing dates');
        }
        const data = await res.json();
        setHearingDates(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load hearing dates.';
        console.error(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchHearingDates();
  }, []);

  if (loading) {
    return <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>Loading calendar...</div>;
  }
  if (error) {
    return <div style={{ maxWidth: 720, margin: "0 auto", padding: 24, color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1E3A5F", marginBottom: 16 }}>Hearing Calendar</h1>
      <CalendarWidget hearingDates={hearingDates} />
    </div>
  );
}
