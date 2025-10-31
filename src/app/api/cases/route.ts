import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { withAuth } from '@/middleware/auth';
import { CaseService } from '@/services/case.service';
import { validateCase } from '@/utils/validation';

export const GET = withLogging(withErrorHandling(async () => {
  return NextResponse.json(await CaseService.list(), { status: 200 });
}));

export const POST = withLogging(withErrorHandling(withAuth(async (req: NextRequest) => {
  const body = await req.json();
  console.log('Request Body:', body);
  const errors = validateCase(body);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const created = await CaseService.create(body);
  console.log('Created Case:', created);
  return NextResponse.json(created, { status: 201 });
})));


