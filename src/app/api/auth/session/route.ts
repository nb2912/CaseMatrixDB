import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get('cmdb_token')?.value;
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  return NextResponse.json({ authenticated: true, user: { id: payload.sub, email: payload.email, role: payload.role } }, { status: 200 });
};
