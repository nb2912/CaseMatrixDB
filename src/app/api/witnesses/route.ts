import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { withAuth } from '@/middleware/auth';
import { WitnessService } from '@/services/witness.service';
import { validateWitness } from '@/utils/validation';

export const GET = withLogging(withErrorHandling(async (req: NextRequest) => {
  const caseId = req.nextUrl.searchParams.get('caseId') || undefined;
  return NextResponse.json(await WitnessService.list(caseId || undefined), { status: 200 });
}));

export const POST = withLogging(withErrorHandling(withAuth(async (req: NextRequest) => {
  const body = await req.json();
  console.log('Request Body:', body);
  const errors = validateWitness(body);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const created = await WitnessService.create(body);
  console.log('Created Witness:', created);
  return NextResponse.json(created, { status: 201 });
})));


