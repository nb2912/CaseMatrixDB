import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { LawyerService } from '@/services/lawyer.service';

export const GET = async () => {
  const lawyers = await LawyerService.list();
  return NextResponse.json(lawyers, { status: 200 });
};
