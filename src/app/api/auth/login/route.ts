import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withLogging } from '@/middleware/withHandlers';
import { AuthService } from '@/services/auth.service';

export const POST = withLogging(withErrorHandling(async (req: NextRequest) => {
  const { email, password } = await req.json();
  const { user, token } = AuthService.login(email, password);
  const res = NextResponse.json({ user }, { status: 200 });
  res.cookies.set('cmdb_token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
  return res;
}));


