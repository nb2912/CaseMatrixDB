import prisma from '@/lib/prisma';
import { Case, Prisma } from '@prisma/client';

export const CaseService = {
  async list(): Promise<Case[]> {
    return prisma.case.findMany();
  },

  async get(id: string): Promise<Case | null> {
    return prisma.case.findUnique({ where: { id } });
  },

  async create(data: Prisma.CaseCreateInput): Promise<Case> {
    return prisma.case.create({ data });
  },

  async update(id: string, data: Prisma.CaseUpdateInput): Promise<Case | null> {
    return prisma.case.update({ where: { id }, data });
  },

  async remove(id: string): Promise<Case | null> {
    return prisma.case.delete({ where: { id } });
  },
};


