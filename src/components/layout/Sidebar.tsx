"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Cases", href: "/cases" },
  { label: "Evidence", href: "/evidence/new" },
  { label: "Witnesses", href: "/witnesses/1234" },
  { label: "Search", href: "/search" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <aside className="h-full w-60 bg-[#1E3A5F] text-white shadow-md">
      {/* Brand Logo */}
      <div className="px-6 pb-6 pt-5 text-xl font-bold tracking-wide">CaseMatrixDB</div>

      {/* Navigation Items */}
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/") || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <button
                    onClick={() => { router.push(item.href); close(); }}
                    className={`w-full rounded-md px-4 py-3 text-left text-sm font-medium transition-colors duration-150 ${active ? 'bg-white/10' : 'hover:bg-white/10'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F] focus-visible:ring-white`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

      {/* Footer Section */}
      <div className="mt-auto px-6 py-3 text-sm text-white/70">© {new Date().getFullYear()} CaseMatrixDB</div>
    </aside>
  );
};

export default Sidebar;
