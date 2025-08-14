import React from "react";

const CalendarWidget = () => {
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(year, now.getMonth(), 1).getDay();
  const totalDays = new Date(year, now.getMonth() + 1, 0).getDate();

  const calendarCells: Array<string | number> = Array(firstDay).fill("");
  for (let i = 1; i <= totalDays; i++) {
    calendarCells.push(i);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-100">
      <h2 className="mb-3 text-center text-lg font-semibold text-[#1E3A5F]">
        {monthName} {year}
      </h2>
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-700">
        {days.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm text-gray-700">
        {calendarCells.map((date, idx) => {
          const isToday = date === now.getDate();
          return (
            <div
              key={idx}
              className={`${isToday ? 'bg-[#2563EB] text-white font-semibold' : 'text-gray-700'} rounded-md py-1`}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
