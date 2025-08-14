"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const Navbar = () => {
  const router = useRouter();
  const { toggle } = useSidebar();

  return (
    <nav className="flex h-16 items-center justify-between bg-[#1E3A5F] px-4 text-white shadow">
      <div className="flex items-center gap-2">
        {/* Mobile menu */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Toggle menu"
          onClick={toggle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-lg font-bold tracking-wide">CaseMatrixDB</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <input
            type="text"
            placeholder="Search cases..."
            className="w-44 rounded-md bg-white/15 px-3 py-2 text-sm placeholder-white/70 outline-none ring-0 backdrop-blur focus-visible:bg-white/20"
          />
          <button
            className="rounded-md bg-[#2563EB] px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={() => router.push('/cases/new')}
          >
            + New Case
          </button>
        </div>
        {/* Profile/Login status */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onClick={() => router.push('/login')}
        >
          U
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
