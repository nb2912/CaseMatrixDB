"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Cases", href: "/cases" },
  { label: "Search", href: "/search" },
  { label: "Appoint Lawyer", href: "/lawyers" },
  { label: "Chatbot", href: "/chatbot" },
  { label: "Courts Near Me", href: "/courts" },
  { label: "About Us", href: "/about" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Role-based nav items logic (matching Sidebar.tsx)
  const filteredNavItems = navItems.filter(item => {
    if (!user) return false;
    // Judges don't appoint lawyers
    if (user.role === 'judge') {
      return item.label !== 'Appoint Lawyer';
    }
    // Lawyers don't need a main landing dashboard
    if (user.role === 'lawyer') {
      return item.label !== 'Dashboard';
    }
    return true; 
  });

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand & Desktop Nav */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 group transition-all"
            >
              <div className="h-8 w-8 rounded-lg bg-primary-900 flex items-center justify-center group-hover:bg-accent-600 transition-colors">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 01-6.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight hidden sm:block">CaseMatrix</span>
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {filteredNavItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                      active 
                        ? 'text-accent-600 bg-accent-50' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
             <button
              className="hidden sm:flex btn-primary items-center gap-2 text-xs py-2"
              onClick={() => router.push('/cases/new')}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Case
            </button>

            <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

            <button
              className="flex items-center gap-2 rounded-full hover:bg-slate-50 p-1 pr-3 transition-colors group border border-transparent hover:border-slate-100"
              onClick={() => router.push(user ? '/profile' : '/login')}
            >
              <div className="h-8 w-8 items-center justify-center rounded-full bg-primary-900 text-xs font-bold text-accent-500 flex group-hover:shadow-lg transition-all uppercase">
                {user ? user.email[0] : 'U'}
              </div>
              {user && (
                <div className="hidden md:block text-left leading-tight">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[100px]">{user.email.split('@')[0]}</p>
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white p-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {filteredNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => { router.push(item.href); setMobileMenuOpen(false); }}
                  className={`px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                    active 
                      ? 'text-accent-600 bg-accent-50' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              className="mt-4 btn-primary w-full py-3 flex items-center justify-center gap-2"
              onClick={() => { router.push('/cases/new'); setMobileMenuOpen(false); }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Case Record
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
