"use client";

import React from "react";
import { useRouter } from "next/navigation"; 

export default function DashboardPage() {
  const router = useRouter();

  const quickLinks = [
    {
      title: "View All Cases",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
      focusRing: "focus:ring-blue-500",
      path: "/cases",
    },
    {
      title: "Upload Evidence",
      color: "from-emerald-600 to-emerald-700",
      hoverColor: "hover:from-emerald-700 hover:to-emerald-800",
      focusRing: "focus:ring-emerald-500",
      path: "/evidence/new",
    },
    {
      title: "Manage Witnesses",
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      focusRing: "focus:ring-orange-400",
      path: "/witnesses/1234",
    },
    {
      title: "Hearing Calendar",
      color: "from-purple-700 to-purple-800",
      hoverColor: "hover:from-purple-800 hover:to-purple-900",
      focusRing: "focus:ring-purple-600",
      path: "/calendar",
    },
  ];

  const searchCaseLink = {
    title: "Search Cases",
    color: "from-red-600 to-red-700",
    hoverColor: "hover:from-red-700 hover:to-red-800",
    focusRing: "focus:ring-red-500",
    path: "/search",
  };

  const activities = [
    "New case added: State vs. John Doe",
    "Evidence uploaded for Case #1234: Document_A.pdf",
    "Witness added: Jane Smith (Case #1234)",
    "Hearing scheduled for Case #5678: August 25, 2025 at 10:00 AM",
    "Case #7890 updated: Status changed to 'Pending Review'",
    "Research document uploaded: 'Legal Precedents in Digital Forensics'",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="container-responsive">
        {/* Title */}
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900 md:text-5xl tracking-tight">
          Dashboard
        </h1>
        <p className="mb-10 text-base text-gray-700 sm:text-lg leading-relaxed">
          Welcome to{" "}
          <span className="font-extrabold text-blue-600">CaseMatrixDB</span> — a
          centralized platform for{" "}
          <b className="text-gray-800">cases</b>,{" "}
          <b className="text-gray-800">evidence</b>,{" "}
          <b className="text-gray-800">witnesses</b>,{" "}
          <b className="text-gray-800">hearings</b>, and{" "}
          <b className="text-gray-800">legal research</b>.
        </p>

        {/* Quick Links */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => router.push(link.path)}
              className={`group relative flex items-center justify-center rounded-2xl p-8 text-center text-xl font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${link.focusRing} 
                         bg-gradient-to-br ${link.color} ${link.hoverColor}`}
            >
              {link.title}
            </button>
          ))}
        </div>

        {/* Search Button */}
        <div className="mb-10">
          <button
            onClick={() => router.push(searchCaseLink.path)}
            className={`w-full rounded-2xl py-5 text-2xl font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${searchCaseLink.focusRing} 
                       bg-gradient-to-br ${searchCaseLink.color} ${searchCaseLink.hoverColor}`}
          >
            {searchCaseLink.title}
          </button>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <h2 className="mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-sm leading-relaxed text-gray-700 sm:text-base">
            {activities.map((activity, idx) => {
              const parts = activity.split(":");
              return (
                <li
                  key={idx}
                  className="flex items-start bg-gray-50 rounded-xl p-4 shadow-sm ring-1 ring-gray-100 hover:bg-gray-100/80 transition"
                >
                  <span className="mr-3 pt-1 text-blue-500 text-xl">•</span>
                  <span>
                    <span className="font-medium text-gray-800">
                      {parts[0]}
                    </span>
                    :{" "}
                    <b className="font-semibold text-gray-900">
                      {parts[1]?.trim()}
                    </b>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
