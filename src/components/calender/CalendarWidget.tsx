import React from "react";

const CalendarWidget = () => {
  // Generate a simple date grid for the current month
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  // Simple array of days
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(year, now.getMonth(), 1).getDay();
  const totalDays = new Date(year, now.getMonth() + 1, 0).getDate();

  const calendarCells = Array(firstDay).fill("");
  for (let i = 1; i <= totalDays; i++) {
    calendarCells.push(i);
  }

  return (
    <div
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
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        {monthName} {year}
      </h2>

      {/* Days of week */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          marginBottom: 8,
          fontWeight: 600,
          color: "#374151",
        }}
      >
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar dates */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          gap: "4px",
          fontSize: 14,
          color: "#374151",
        }}
      >
        {calendarCells.map((date, idx) => (
          <div
            key={idx}
            style={{
              padding: "6px 0",
              background:
                date === now.getDate() ? "#2563EB" : "transparent",
              color: date === now.getDate() ? "#fff" : "#374151",
              borderRadius: 6,
              fontWeight: date === now.getDate() ? 600 : 400,
            }}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
