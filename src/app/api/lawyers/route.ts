import { NextRequest, NextResponse } from 'next/server';
import { LawyerService } from '@/services/lawyer.service';

export const GET = async (_req: NextRequest) => {
  const lawyers = await LawyerService.list();
  return NextResponse.json(lawyers, { status: 200 });
};
