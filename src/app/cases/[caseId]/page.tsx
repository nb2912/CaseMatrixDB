import React from 'react';

export default function CaseDetailPage({ params }: { params: { caseId: string } }) {
  // Dummy data for UI
  const caseData = {
    id: params.caseId,
    title: 'State vs. John Doe',
    status: 'Open',
    description: 'A high-profile criminal case involving John Doe.',
    date: '2025-08-01',
  };

  // Status color mapping
  const statusColors: Record<string, { bg: string; text: string }> = {
    Open: { bg: '#3FA796', text: '#FFFFFF' }, // Emerald Green
    Closed: { bg: '#E76F51', text: '#FFFFFF' }, // Soft Red
    Pending: { bg: '#C6A15B', text: '#FFFFFF' }, // Gold
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
      {/* Title and Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#1E3A5F' }}>
          {caseData.title}
        </h1>
        <span
          style={{
            backgroundColor: statusColors[caseData.status].bg,
            color: statusColors[caseData.status].text,
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {caseData.status}
        </span>
      </div>

      {/* Case Details Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          padding: '24px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
        }}
      >
        <h2 style={{ color: '#1E3A5F', fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>
          Description
        </h2>
        <p style={{ color: '#2B2B2B', fontSize: '16px', lineHeight: '1.5' }}>
          {caseData.description}
        </p>
        <div style={{ marginTop: '20px', color: '#6B7280', fontSize: '14px' }}>
          📅 Date: {caseData.date}
        </div>
      </div>
    </div>
  );
}
