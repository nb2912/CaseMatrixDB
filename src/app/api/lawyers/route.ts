import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/services/data';

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const specialization = url.searchParams.get('specialization');
  let lawyers = users.filter(u => u.role === 'lawyer');
  if (specialization && specialization !== 'all') {
    lawyers = lawyers.filter(l => l.specialization === specialization);
  }
  return NextResponse.json(lawyers.map(l => ({ id: l.id, email: l.email, specialization: l.specialization })), { status: 200 });
};
