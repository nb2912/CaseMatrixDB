import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { withAuth } from '@/middleware/auth';
import { EvidenceService } from '@/services/evidence.service';
import { validateEvidence } from '@/utils/validation';

export const GET = withLogging(withErrorHandling(async (req: NextRequest) => {
  const caseId = req.nextUrl.searchParams.get('caseId') || undefined;
  return NextResponse.json(EvidenceService.list(caseId || undefined), { status: 200 });
}));

export const POST = withLogging(withErrorHandling(withAuth(async (req: NextRequest) => {
  const body = await req.json();
  const errors = validateEvidence(body);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const created = EvidenceService.create(body);
  return NextResponse.json(created, { status: 201 });
})));


