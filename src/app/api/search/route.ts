import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import prisma from '@/lib/prisma';

export const GET = withLogging(withErrorHandling(async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get('q') || '';

  const [cases, evidence, witnesses] = await Promise.all([
    prisma.case.findMany({
      where: { title: { contains: q } },
      orderBy: { date: 'desc' },
      take: 25,
    }),
    prisma.evidence.findMany({
      where: { name: { contains: q } },
      orderBy: { uploaded: 'desc' },
      take: 25,
    }),
    prisma.witness.findMany({
      where: { name: { contains: q } },
      orderBy: { name: 'asc' },
      take: 25,
    }),
  ]);

  return NextResponse.json({ cases, evidence, witnesses }, { status: 200 });
}));


