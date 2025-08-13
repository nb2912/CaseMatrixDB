import React from "react";
import { useRouter } from "next/navigation";

interface CaseCardProps {
  id: string;
  title: string;
  status: "Open" | "Closed" | "Pending";
  date: string;
}

const statusColors: Record<CaseCardProps["status"], string> = {
  Open: "#059669", // Green
  Closed: "#DC2626", // Red
  Pending: "#F59E42", // Orange
};

const CaseCard: React.FC<CaseCardProps> = ({ id, title, status, date }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/cases/${id}`)}
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        padding: 24,
        marginBottom: 16,
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.07)";
      }}
    >
      <h3 style={{ color: "#1E3A5F", fontSize: 20, fontWeight: 600 }}>
        {title}
      </h3>
      <div
        style={{
          color: statusColors[status],
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {status}
      </div>
      <div style={{ color: "#6B7280", fontSize: 14 }}>{date}</div>
    </div>
  );
};

export default CaseCard;
