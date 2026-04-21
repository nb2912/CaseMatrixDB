import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';

export const dynamic = 'force-dynamic';

export const GET = withLogging(withErrorHandling(async () => {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
    take: 100, // Limit to last 100 actions for performance
  });

  return NextResponse.json(logs, { status: 200 });
}));
