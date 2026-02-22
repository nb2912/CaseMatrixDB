"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/reset-password";

  if (isAuthPage) {
    return <main className="min-h-screen bg-slate-50">{children}</main>;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      <header className="flex-shrink-0">
        <Navbar />
      </header>
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
