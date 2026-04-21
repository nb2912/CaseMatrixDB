import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';

export const dynamic = 'force-dynamic';

export const GET = withLogging(withErrorHandling(async () => {
  const hearings = await prisma.hearing.findMany({
    include: {
      case: {
        select: {
          id: true,
          title: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  });

  return NextResponse.json(hearings, { status: 200 });
}));
