"use client";

import React from 'react';
import { Clock, History, FilePlus, UserCheck, AlertCircle } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  details: string;
  timestamp: string;
  user: { email: string };
}

export const CaseTimeline = ({ logs }: { logs: AuditLog[] }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="p-8 text-center glass-card border-slate-200 bg-slate-50/50">
        <History className="h-8 w-8 text-slate-200 mx-auto mb-3" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No timeline data available</p>
      </div>
    );
  }

  const getIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return <FilePlus className="h-4 w-4" />;
      case 'UPDATE': return <Clock className="h-4 w-4" />;
      case 'DELETE': return <AlertCircle className="h-4 w-4" />;
      default: return <UserCheck className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100">
      {logs.map((log, index) => (
        <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
          {/* Dot */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 text-slate-400 shadow-sm md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-primary-900 group-hover:text-accent-500 transition-all duration-300 z-10">
            {getIcon(log.action)}
          </div>
          
          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[45%] glass-card p-5 border-slate-200 hover:border-accent-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-accent-600 uppercase tracking-widest bg-accent-50 px-2 py-1 rounded-md">
                {log.action}
              </span>
              <time className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                {new Date(log.timestamp).toLocaleDateString()} • {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </time>
            </div>
            <p className="text-sm font-bold text-slate-900 mb-1 leading-snug">{log.details}</p>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-50 mt-3">
              <div className="h-4 w-4 rounded-full bg-slate-100 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                By {log.user.email.split('@')[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
