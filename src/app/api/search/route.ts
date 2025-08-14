import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { cases, evidences, witnesses } from '@/services/data';

export const GET = withLogging(withErrorHandling(async (req: NextRequest) => {
  const q = (req.nextUrl.searchParams.get('q') || '').toLowerCase();
  const result = {
    cases: cases.filter(c => c.title.toLowerCase().includes(q)),
    evidence: evidences.filter(e => e.name.toLowerCase().includes(q)),
    witnesses: witnesses.filter(w => w.name.toLowerCase().includes(q)),
  };
  return NextResponse.json(result, { status: 200 });
}));


