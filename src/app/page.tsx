"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAuth } from "@/context/AuthContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  ShieldCheck, Gavel, Users, FileText, Activity, Shield, History,
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
      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Large Analytics: Case Status */}
        <div className="md:col-span-2 md:row-span-2 glass-card p-8 border-slate-200 flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Operational Status</h3>
              <p className="text-sm font-bold text-slate-900 mt-1">Live Case Distribution</p>
            </div>
            <Activity className="h-4 w-4 text-accent-500 animate-pulse" />
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
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {data?.statusDistribution?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stat Card: Active Cases */}
        <div className="md:col-span-1 md:row-span-1 glass-card p-6 border-slate-200 group hover:border-accent-500/50 transition-all flex flex-col justify-between">
          <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary-900 group-hover:text-white transition-colors w-fit">
            <Gavel className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Matrix</p>
            <p className="text-4xl font-black text-slate-900 mt-1">{data?.counts.cases || 0}</p>
          </div>
        </div>

        {/* Stat Card: Evidence */}
        <div className="md:col-span-1 md:row-span-1 glass-card p-6 border-slate-200 group hover:border-accent-500/50 transition-all flex flex-col justify-between">
          <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary-900 group-hover:text-white transition-colors w-fit">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Vault</p>
            <p className="text-4xl font-black text-slate-900 mt-1">{data?.counts.evidence || 0}</p>
          </div>
        </div>

        {/* Stat Card: Witnesses */}
        <div className="md:col-span-1 md:row-span-1 glass-card p-6 border-slate-200 group hover:border-accent-500/50 transition-all flex flex-col justify-between">
          <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary-900 group-hover:text-white transition-colors w-fit">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Witness Pool</p>
            <p className="text-4xl font-black text-slate-900 mt-1">{data?.counts.witnesses || 0}</p>
          </div>
        </div>

        {/* Security / System Info Card */}
        <div className="md:col-span-1 md:row-span-1 glass-card p-6 bg-primary-900 border-none flex flex-col justify-between relative overflow-hidden group">
          <Shield className="h-8 w-8 text-accent-500 relative z-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Level</p>
            <p className="text-2xl font-black text-white mt-1">High (Encrypted)</p>
          </div>
          <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
        </div>

        {/* Audit Matrix (Spanning height) */}
        <div className="md:col-span-2 md:row-span-2 glass-card p-8 border-slate-200 flex flex-col h-[420px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-accent-500 shadow-lg shadow-slate-900/20">
                <History className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Audit Matrix</h3>
                <p className="text-[10px] font-bold text-slate-900 mt-0.5 uppercase">Real-time Stream</p>
              </div>
            </div>
            <button className="text-[10px] font-black text-accent-600 uppercase tracking-widest hover:underline" onClick={() => router.push('/admin')}>Deep Audit</button>
          </div>
          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {data?.recentLogs?.length > 0 ? (
              data.recentLogs.map((log: any) => (
                <div key={log.id} className="group relative pl-4 border-l-2 border-slate-100 hover:border-accent-500 transition-colors py-1">
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${log.action === 'CREATE' ? 'bg-emerald-500' : log.action === 'DELETE' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                    {log.action} {log.entity}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">
                    BY {log.user} • {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 grayscale">
                <Activity className="h-12 w-12 text-slate-200 mb-3" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Nominal</p>
              </div>
            )}
          </div>
        </div>

        {/* Priority Analytics */}
        <div className="md:col-span-2 md:row-span-2 glass-card p-8 border-slate-200 flex flex-col h-[420px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Priority Matrix</h3>
              <p className="text-sm font-bold text-slate-900 mt-1">Resource Allocation</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.priorityDistribution || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight={900} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} fontSize={10} fontWeight={900} tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={40}>
                   {data?.priorityDistribution?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={['#ef4444', '#f59e0b', '#6366f1'][index % 3]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Alerts (Footer Banner) */}
        {data?.alertCount > 0 && (
          <div className="md:col-span-4 glass-card p-6 bg-amber-50 border-amber-100 flex items-center justify-between group cursor-pointer hover:bg-amber-100 transition-all">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 animate-pulse">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-black text-amber-900 uppercase tracking-tight">Critical Attention Required</p>
                <p className="text-xs font-bold text-amber-700 mt-0.5">
                  {data.alertCount} High-Priority Case{data.alertCount > 1 ? 's' : ''} unassigned. Immediate lawyer appointment mandatory.
                </p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-amber-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors">Resolve Now</button>
          </div>
        )}
      </div>


    </div>
  );
}
