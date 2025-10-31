import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { Providers } from "@/context/Providers";

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
      <body className="bg-gray-50 text-gray-800">
        <Providers>
          <div className="flex min-h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:block w-60 shrink-0 border-r border-gray-200 bg-white">
              <Sidebar />
            </aside>
            <div className="flex flex-1 flex-col">
              <header className="sticky top-0 z-50 bg-white shadow-sm">
                <Navbar />
              </header>
              <MobileSidebar />
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
