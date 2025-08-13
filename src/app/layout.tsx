import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export const metadata = {
  title: "CaseMatrixDB",
  description: "Legal Case Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#F4F5F7",
          color: "#2B2B2B",
          margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Sidebar with smooth transition */}
          <aside
            style={{
              flexShrink: 0,
              transition: "all 0.3s ease",
              borderRight: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Sidebar />
          </aside>

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "auto",
            }}
          >
            <header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <Navbar />
            </header>

            <main
              style={{
                flex: 1,
                padding: "24px",
                transition: "background-color 0.3s ease",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
