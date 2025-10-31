import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { CaseService } from '@/services/case.service';

export const GET = withLogging(withErrorHandling(async () => {
  const cases = await CaseService.list();
  const hearingDates = cases.map(c => c.date);
  return NextResponse.json(hearingDates, { status: 200 });
}));
