import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { withAuth } from '@/middleware/auth';
import { WitnessService } from '@/services/witness.service';
import { validateWitness } from '@/utils/validation';

export const GET = withLogging(withErrorHandling(async (req: NextRequest) => {
  const caseId = req.nextUrl.searchParams.get('caseId') || undefined;
  return NextResponse.json(WitnessService.list(caseId || undefined), { status: 200 });
}));

export const POST = withLogging(withErrorHandling(withAuth(async (req: NextRequest) => {
  const body = await req.json();
  const errors = validateWitness(body);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const created = WitnessService.create(body);
  return NextResponse.json(created, { status: 201 });
})));


