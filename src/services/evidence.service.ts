import prisma from '@/lib/prisma';
import { Evidence, Prisma } from '@prisma/client';

export const EvidenceService = {
  async list(caseId?: string): Promise<Evidence[]> {
    return prisma.evidence.findMany({ where: { caseId } });
  },

  async get(id: string): Promise<Evidence | null> {
    return prisma.evidence.findUnique({ where: { id } });
  },

  async create(data: Prisma.EvidenceCreateInput): Promise<Evidence> {
    return prisma.evidence.create({ data });
  },

  async update(id: string, data: Prisma.EvidenceUpdateInput): Promise<Evidence | null> {
    return prisma.evidence.update({ where: { id }, data });
  },

  async remove(id: string): Promise<Evidence | null> {
    return prisma.evidence.delete({ where: { id } });
  },
};


