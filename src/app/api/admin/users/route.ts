import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';

export const dynamic = 'force-dynamic';

export const GET = withLogging(withErrorHandling(async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(users, { status: 200 });
}));
