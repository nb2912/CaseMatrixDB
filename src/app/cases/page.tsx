"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const cases = [
  { id: '1', title: 'State vs. John Doe', status: 'Open', date: '2025-08-01' },
  { id: '2', title: 'Acme Corp. vs. Smith', status: 'Closed', date: '2025-07-15' },
  { id: '3', title: 'People vs. Jane Roe', status: 'In Progress', date: '2025-08-10' },
];

export default function CasesPage() {
  const router = useRouter();

  const statusColors: Record<string, { bg: string; text: string }> = {
    Open: { bg: '#3FA796', text: '#FFFFFF' },         // Emerald Green
    Closed: { bg: '#E76F51', text: '#FFFFFF' },       // Soft Red
    'In Progress': { bg: '#C6A15B', text: '#FFFFFF' } // Gold
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1E3A5F', marginBottom: '24px' }}>
        All Cases
      </h1>

      <table
        style={{
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          borderCollapse: 'collapse'
        }}
      >
        <thead style={{ background: '#F4F5F7' }}>
          <tr>
            <th style={{ padding: '16px', textAlign: 'left', color: '#1E3A5F', fontWeight: 600 }}>
              Case Title
            </th>
            <th style={{ padding: '16px', textAlign: 'left', color: '#1E3A5F', fontWeight: 600 }}>
              Status
            </th>
            <th style={{ padding: '16px', textAlign: 'left', color: '#1E3A5F', fontWeight: 600 }}>
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c) => (
            <tr
              key={c.id}
              onClick={() => router.push(`/cases/${c.id}`)}
              style={{
                borderBottom: '1px solid #F4F5F7',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <td style={{ padding: '16px', color: '#2B2B2B', fontWeight: 500 }}>
                {c.title}
              </td>
              <td style={{ padding: '16px' }}>
                <span
                  style={{
                    backgroundColor: statusColors[c.status].bg,
                    color: statusColors[c.status].text,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {c.status}
                </span>
              </td>
              <td style={{ padding: '16px', color: '#6B7280', fontSize: '14px' }}>
                {c.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
