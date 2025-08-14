import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { withAuth } from '@/middleware/auth';
import { WitnessService } from '@/services/witness.service';

export const GET = withLogging(withErrorHandling(async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const found = WitnessService.get(params.id);
  if (!found) return NextResponse.json({ error: 'Witness not found' }, { status: 404 });
  return NextResponse.json(found, { status: 200 });
}));

export const PUT = withLogging(withErrorHandling(withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
  const body = await req.json();
  const updated = WitnessService.update(params.id, body);
  if (!updated) return NextResponse.json({ error: 'Witness not found' }, { status: 404 });
  return NextResponse.json(updated, { status: 200 });
})));

export const DELETE = withLogging(withErrorHandling(withAuth(async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const ok = WitnessService.remove(params.id);
  if (!ok) return NextResponse.json({ error: 'Witness not found' }, { status: 404 });
  return NextResponse.json({ success: true }, { status: 200 });
})));


