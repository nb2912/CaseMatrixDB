"use client";
import React from "react";
import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <div className={`md:hidden ${isOpen ? 'fixed inset-0 z-50' : 'hidden'}`} aria-hidden={!isOpen}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />
      {/* Panel */}
      <div className="absolute inset-y-0 left-0 w-64 animate-in slide-in-from-left duration-200">
        <div className="flex h-full flex-col bg-[#1E3A5F] text-white shadow-xl">
          <div className="flex items-center justify-between px-4 py-4">
            <span className="text-base font-semibold">Menu</span>
            <button
              className="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={close}
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}


