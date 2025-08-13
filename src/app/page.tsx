export default function DashboardPage() {
  const quickLinks = [
    { title: "View All Cases", color: "#2563EB" },
    { title: "Upload Evidence", color: "#059669" },
    { title: "Manage Witnesses", color: "#F59E42" },
    { title: "Hearing Calendar", color: "#A21CAF" },
    { title: "Search Cases", color: "#DC2626" },
  ];

  const activities = [
    "New case added: State vs. John Doe",
    "Evidence uploaded for Case #1234",
    "Witness added: Jane Smith",
    "Hearing scheduled for Case #5678",
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 32 }}>
      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "#1E3A5F",
          marginBottom: 20,
          letterSpacing: 0.5,
        }}
      >
        Dashboard
      </h1>

      <p style={{ fontSize: 18, color: "#374151", marginBottom: 32 }}>
        Welcome to{" "}
        <span style={{ color: "#2563EB", fontWeight: 600 }}>CaseMatrixDB</span>{" "}
        — Your centralized platform for managing{" "}
        <b>cases, evidence, witnesses, hearings</b>, and legal research.
      </p>

      {/* Quick Links */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        {quickLinks.map((item) => (
          <div
            key={item.title}
            style={{
              flex: "1 1 200px",
              background: item.color,
              color: "#fff",
              borderRadius: 12,
              padding: "24px 16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              fontWeight: 600,
              fontSize: 18,
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 14px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 10px rgba(0,0,0,0.08)";
            }}
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          padding: 32,
        }}
      >
        <h2
          style={{
            color: "#1E3A5F",
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Recent Activity
        </h2>
        <ul style={{ color: "#374151", fontSize: 16, lineHeight: 2 }}>
          {activities.map((activity, idx) => {
            const parts = activity.split(":");
            return (
              <li key={idx}>
                {parts[0]}: <b>{parts[1]?.trim()}</b>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
