import "../styles/globals.css";
import { Providers } from "@/context/Providers";
import AppLayout from "@/components/layout/AppLayout";

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
      <body className="antialiased">
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
