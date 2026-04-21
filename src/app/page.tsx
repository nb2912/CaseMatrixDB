"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAuth } from "@/context/AuthContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  ShieldCheck, Gavel, Users, FileText, Activity, 
  ArrowUpRight, Clock, Database, Search, MessageSquare, Plus, AlertCircle
} from 'lucide-react';

const COLORS = ['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch('/api/dashboard/stats');
        if (res.ok) {
          const stats = await res.json();
          setData(stats);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const stats = [
    { label: "Active Cases", value: data?.counts?.cases || 0, icon: <Gavel className="h-5 w-5" />, color: "text-blue-600" },
    { label: "Total Evidence", value: data?.counts?.evidence || 0, icon: <FileText className="h-5 w-5" />, color: "text-emerald-600" },
    { label: "Witnesses", value: data?.counts?.witnesses || 0, icon: <Users className="h-5 w-5" />, color: "text-amber-600" },
    { label: "Security Level", value: "High", icon: <ShieldCheck className="h-5 w-5" />, color: "text-indigo-600" },
  ];

  const quickLinks = [
    { title: "New Case", path: "/cases/new", icon: <Plus /> },
    { title: "Deep Search", path: "/search", icon: <Search /> },
    { title: "Assistant", path: "/chatbot", icon: <MessageSquare /> },
    { title: "Archive", path: "/cases", icon: <Database /> },
  ];

  if (loading) return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-primary-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Matrix...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Matrix</h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            {user ? `Authenticated as ${user.email.split('@')[0]}` : "Establishing secure uplink..."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {quickLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => router.push(link.path)}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:border-accent-500 hover:text-accent-600 transition-all shadow-sm group"
              title={link.title}
            >
              {React.cloneElement(link.icon as React.ReactElement, { className: "h-5 w-5" } as any)}
            </button>
          ))}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 border-slate-200 group hover:border-accent-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${stat.color} group-hover:bg-primary-900 group-hover:text-white transition-colors`}>
                {stat.icon}
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status Distribution */}
            <div className="glass-card p-6 border-slate-200 h-[350px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent-500" />
                  Case Status
                </h3>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.statusDistribution || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data?.statusDistribution?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="glass-card p-6 border-slate-200 h-[350px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-accent-500" />
                  Priority Distribution
                </h3>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.priorityDistribution || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>


        </div>

        {/* Sidebar: Audit Logs & Activity */}
        <div className="space-y-8">
          <div className="glass-card p-6 border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent-500" />
              Audit Matrix
            </h3>
            <div className="space-y-6">
              {data?.recentLogs?.length > 0 ? (
                data.recentLogs.map((log: any) => (
                  <div key={log.id} className="relative pl-6 pb-6 border-l border-slate-100 last:pb-0">
                    <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-accent-500 border-2 border-white shadow-[0_0_0_2px_rgba(245,158,11,0.1)]"></div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">
                        {log.action} {log.entity}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                        BY {log.user} • {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 space-y-3">
                  <Activity className="h-8 w-8 text-slate-200 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No activity detected</p>
                </div>
              )}
            </div>
            {data?.recentLogs?.length > 0 && (
              <button className="w-full mt-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-50 hover:text-accent-600 transition-colors">
                View Full Log
              </button>
            )}
          </div>

          {data?.alertCount > 0 && (
            <div className="glass-card p-6 bg-slate-50 border-slate-200 animate-in zoom-in duration-500">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                System Alerts
              </h3>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase tracking-tight">
                  {data.alertCount} high-priority case{data.alertCount > 1 ? 's' : ''} require immediate lawyer appointment. Check case archive.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="pt-10 border-t border-slate-100 flex justify-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} CaseMatrixDB. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
