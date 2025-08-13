import React from 'react';
import { useRouter } from 'next/navigation';

const evidenceList = [
  { id: 'e1', name: 'Photo of Crime Scene', type: 'Image', uploaded: '2025-08-01' },
  { id: 'e2', name: 'Witness Statement', type: 'Document', uploaded: '2025-08-02' },
];

export default function EvidencePage({ params }: { params: { caseId: string } }) {
  const router = useRouter();

  const typeColors: Record<string, { bg: string; text: string }> = {
    Image: { bg: '#3FA796', text: '#FFFFFF' },     // Emerald green
    Document: { bg: '#1E3A5F', text: '#FFFFFF' },  // Deep navy
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#6A1B9A', marginBottom: '24px' }}>
        Evidence for Case #{params.caseId}
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
            <th style={{ padding: '16px', textAlign: 'left', color: '#6A1B9A', fontWeight: 600 }}>Name</th>
            <th style={{ padding: '16px', textAlign: 'left', color: '#6A1B9A', fontWeight: 600 }}>Type</th>
            <th style={{ padding: '16px', textAlign: 'left', color: '#6A1B9A', fontWeight: 600 }}>Uploaded</th>
          </tr>
        </thead>

        <tbody>
          {evidenceList.map((e) => (
            <tr
              key={e.id}
              onClick={() => router.push(`/cases/${params.caseId}/evidence/${e.id}`)}
              style={{
                borderBottom: '1px solid #F4F5F7',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <td style={{ padding: '16px', color: '#2B2B2B', fontWeight: 500 }}>{e.name}</td>
              <td style={{ padding: '16px' }}>
                <span
                  style={{
                    backgroundColor: typeColors[e.type].bg,
                    color: typeColors[e.type].text,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {e.type}
                </span>
              </td>
              <td style={{ padding: '16px', color: '#6B7280', fontSize: '14px' }}>{e.uploaded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
