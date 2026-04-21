import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import prisma from '@/lib/prisma';

export const GET = withLogging(withErrorHandling(async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get('q') || '';

  const [cases, evidence, witnesses] = await Promise.all([
    prisma.case.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { status: { contains: q } }
        ]
      },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    }),
    prisma.evidence.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { type: { contains: q } }
        ]
      },
      orderBy: { uploaded: 'desc' },
      take: 20,
    }),
    prisma.witness.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { statement: { contains: q } }
        ]
      },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    }),
  ]);

  return NextResponse.json({ cases, evidence, witnesses }, { status: 200 });
}));


