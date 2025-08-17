"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [specialization, setSpecialization] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetch('/api/lawyers')
      .then(res => res.json())
      .then(data => setLawyers(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = specialization === 'all'
    ? lawyers
    : lawyers.filter(l => l.specialization === specialization);

  const handleAppoint = async (lawyerId: string) => {
    if (!user) return;
    // For demo: just alert, in real app call backend
    alert(`Requested appointment with lawyer ${lawyerId}`);
    // await fetch('/api/lawyers/appoint', { method: 'POST', body: JSON.stringify({ lawyerId, userId: user.id }) });
  };

  if (!user || user.role !== 'user') {
    return <div className="p-8 text-center text-lg">Only users can appoint lawyers.</div>;
  }

  return (
    <div className="container-responsive py-8">
      <h1 className="mb-6 text-2xl font-bold">Find a Lawyer</h1>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Specialization:</label>
        <select value={specialization} onChange={e => setSpecialization(e.target.value)} className="rounded px-2 py-1 border">
          <option value="all">All</option>
          <option value="civil">Civil</option>
          <option value="criminal">Criminal</option>
          <option value="other">Other</option>
        </select>
      </div>
      {loading ? (
        <div>Loading lawyers...</div>
      ) : (
        <ul className="space-y-4">
          {filtered.map(lawyer => (
            <li key={lawyer.id} className="rounded bg-white p-4 shadow flex items-center justify-between">
              <div>
                <div className="font-semibold">{lawyer.email}</div>
                <div className="text-sm text-gray-600">Specialization: {lawyer.specialization}</div>
              </div>
              <button
                className="rounded bg-emerald-600 px-4 py-2 text-white font-bold hover:bg-emerald-700"
                onClick={() => handleAppoint(lawyer.id)}
              >
                Appoint
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
