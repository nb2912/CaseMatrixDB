import { NextRequest, NextResponse } from 'next/server';
import { LawyerService } from '@/services/lawyer.service';

export const GET = async (req: NextRequest) => {
  const lawyers = await LawyerService.list();
  return NextResponse.json(lawyers, { status: 200 });
};
