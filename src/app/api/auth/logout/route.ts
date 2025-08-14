import { NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';

export const POST = withLogging(withErrorHandling(async () => {
  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.set('cmdb_token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}));


