import React from "react";
import dynamic from "next/dynamic";

// CalendarWidget is a pure UI component, but ensure it's rendered on client only if needed
const CalendarWidget = dynamic(() => import("@/components/calender/CalendarWidget"), { ssr: false });

export default function CalendarPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1E3A5F", marginBottom: 16 }}>Hearing Calendar</h1>
      <CalendarWidget />
    </div>
  );
}


