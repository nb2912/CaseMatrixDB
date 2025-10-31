import prisma from '@/lib/prisma';
import { generateToken } from '@/utils/jwt';
import { UserRole } from '@/types/entities';

export const AuthService = {
  async register(email: string, password: string, role: UserRole = 'user', specialization?: string) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error('User already exists');

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: password, // In a real app, you should hash the password
        role,
        specialization,
      },
    });

    const token = generateToken(user.id, user.email, user.role);
    return { user, token };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.passwordHash !== password) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id, user.email, user.role);
    return { user, token };
  },
};


