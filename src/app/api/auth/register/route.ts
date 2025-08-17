import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  const { email, password, role, specialization } = await req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: password, // Hash in production!
        role,
        specialization: role === 'lawyer' ? specialization : undefined,
      },
    });
    // You can add JWT/cookie logic here if needed
    return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role, specialization: user.specialization } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'User already exists or DB error.' }, { status: 400 });
  }
};


