import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { withAuth } from '@/middleware/auth';
import { CaseService } from '@/services/case.service';
import { validateCase } from '@/utils/validation';

export const GET = withLogging(withErrorHandling(async () => {
  return NextResponse.json(CaseService.list(), { status: 200 });
}));

export const POST = withLogging(withErrorHandling(withAuth(async (req: NextRequest) => {
  const body = await req.json();
  const errors = validateCase(body);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const created = CaseService.create(body);
  return NextResponse.json(created, { status: 201 });
})));


