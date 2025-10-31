import prisma from '@/lib/prisma';

export const LawyerService = {
  async list() {
    return prisma.user.findMany({ where: { role: 'lawyer' } });
  },
};
