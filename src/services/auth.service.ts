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
        passwordHash: password, 
        role,
        specialization,
      },
    });

    const token = generateToken(user.id, user.email, user.role as UserRole);
    return { user, token };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.passwordHash !== password) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id, user.email, user.role as UserRole);
    return { user, token };
  },

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null; // Security: don't reveal if user exists

    const token = Math.random().toString(36).substring(2, 10).toUpperCase();
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    return token;
  },

  async resetPassword(token: string, newPassword: string) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) throw new Error('Invalid or expired reset token');

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return true;
  },
};


