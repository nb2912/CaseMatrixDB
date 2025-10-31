import prisma from '@/lib/prisma';
import { Witness, Prisma } from '@prisma/client';

export const WitnessService = {
  async list(caseId?: string): Promise<Witness[]> {
    return prisma.witness.findMany({ where: { caseId } });
  },

  async get(id: string): Promise<Witness | null> {
    return prisma.witness.findUnique({ where: { id } });
  },

  async create(data: Prisma.WitnessCreateInput): Promise<Witness> {
    return prisma.witness.create({ data });
  },

  async update(id: string, data: Prisma.WitnessUpdateInput): Promise<Witness | null> {
    return prisma.witness.update({ where: { id }, data });
  },

  async remove(id: string): Promise<Witness | null> {
    return prisma.witness.delete({ where: { id } });
  },
};


