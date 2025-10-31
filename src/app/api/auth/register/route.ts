import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

export const POST = async (req: NextRequest) => {
  const { email, password, role, specialization } = await req.json();
  try {
    const { user, token } = await AuthService.register(email, password, role, specialization);
    // In a real app, you would set the token in an HttpOnly cookie
    return NextResponse.json({ user, token }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};


