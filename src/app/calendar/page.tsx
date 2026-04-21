"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Gavel,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

interface Hearing {
  id: string;
  date: string;
  location: string;
  judgeName: string;
  status: string;
  case: {
    id: string;
    title: string;
  };
}

export default function CalendarPage() {
  const router = useRouter();
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchHearings = async () => {
      try {
        const res = await fetch('/api/hearings/all'); // I need to create this API
        if (!res.ok) throw new Error('Failed to fetch hearings');
        const data = await res.json();
        setHearings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHearings();
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const days = [];
  const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const startDay = firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const getHearingsForDay = (day: number) => {
    return hearings.filter(h => {
      const d = new Date(h.date);
      return d.getDate() === day && 
             d.getMonth() === currentDate.getMonth() && 
             d.getFullYear() === currentDate.getFullYear();
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Legal Calendar</h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-500"></span>
            Scheduled court sessions for {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <span className="px-4 text-sm font-black text-slate-900 uppercase tracking-widest min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <div className="glass-card border-slate-200 overflow-hidden shadow-xl shadow-slate-200/20">
            <div className="grid grid-cols-7 bg-slate-900 text-white border-b border-slate-800">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {days.map((day, i) => {
                const dayHearings = day ? getHearingsForDay(day) : [];
                const isToday = day === new Date().getDate() && 
                                currentDate.getMonth() === new Date().getMonth() && 
                                currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div key={i} className={`min-h-[140px] border-b border-r border-slate-100 p-3 transition-all ${day ? 'bg-white' : 'bg-slate-50/50'} ${isToday ? 'ring-2 ring-inset ring-accent-500/20 bg-accent-50/5' : ''}`}>
                    {day && (
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-sm font-black ${isToday ? 'text-accent-600 bg-accent-100 h-7 w-7 rounded-full flex items-center justify-center -mt-1 -ml-1' : 'text-slate-400'}`}>
                            {day}
                          </span>
                          {dayHearings.length > 0 && (
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse"></span>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          {dayHearings.slice(0, 3).map(h => (
                            <button 
                              key={h.id}
                              onClick={() => router.push(`/cases/${h.case.id}`)}
                              className="w-full text-left p-1.5 rounded-lg bg-slate-50 hover:bg-primary-900 hover:text-white transition-all group"
                            >
                              <p className="text-[9px] font-black truncate uppercase tracking-tight leading-tight">
                                {h.case.title}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5 opacity-60">
                                <Clock className="h-2 w-2" />
                                <span className="text-[8px] font-bold">
                                  {new Date(h.date).getHours()}:{new Date(h.date).getMinutes().toString().padStart(2, '0')}
                                </span>
                              </div>
                            </button>
                          ))}
                          {dayHearings.length > 3 && (
                            <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest pt-1">
                              +{dayHearings.length - 3} more
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Sidebar */}
        <div className="space-y-6">
          <section className="glass-card p-6 border-slate-200">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Docket Activity</h2>
            <div className="space-y-6">
              {hearings.filter(h => new Date(h.date) >= new Date()).slice(0, 4).map(h => (
                <div key={h.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-100">
                  <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-accent-500 border-2 border-white shadow-sm"></div>
                  <p className="text-[10px] font-black text-accent-600 uppercase tracking-widest mb-1">
                    {new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                  <h4 className="text-sm font-bold text-slate-900 truncate mb-2">{h.case.title}</h4>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-bold">{new Date(h.date).getHours()}:00</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-[10px] font-bold truncate max-w-[80px]">{h.location}</span>
                    </div>
                  </div>
                </div>
              ))}
              {hearings.length === 0 && (
                <div className="text-center py-10">
                  <AlertCircle className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                    No upcoming sessions found in the docket.
                  </p>
                </div>
              )}
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}
