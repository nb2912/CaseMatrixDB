import Link from "next/link";
import React from "react";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Cases", href: "/cases" },
  { label: "Evidence", href: "/evidence/1" },
  { label: "Witnesses", href: "/witnesses/1" },
  { label: "Search", href: "/search" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const Sidebar = () => {

  return (
    <aside
      style={{
        width: "240px",
        background: "#1E3A5F",
        color: "#fff",
        padding: "24px 0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Brand Logo */}
      <div
        style={{
          padding: "0 24px 24px",
          fontSize: "20px",
          fontWeight: "bold",
          letterSpacing: 1,
        }}
      >
        CaseMatrixDB
      </div>

      {/* Navigation Items */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((item) => (
              <li key={item.href} style={{ padding: 0, marginBottom: "6px" }}>
                <Link
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "12px 24px",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: 16,
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

      {/* Footer Section */}
      <div
        style={{
          marginTop: "auto",
          padding: "12px 24px",
          fontSize: "14px",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        © {new Date().getFullYear()} CaseMatrixDB
      </div>
    </aside>
  );
};

export default Sidebar;
