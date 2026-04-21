import prisma from '@/lib/prisma';
import { Case, Prisma } from '@prisma/client';
import { createAuditLog } from '@/lib/audit';

interface CaseCreateData {
  title: string;
  status: string;
  priority?: string;
  date: string;
  userId: string;
  description?: string;
}

export const CaseService = {
  async list(): Promise<Case[]> {
    return prisma.case.findMany({
      orderBy: { updatedAt: 'desc' }
    });
  },

  async get(id: string): Promise<Case | null> {
    return prisma.case.findUnique({ 
      where: { id },
      include: { 
        evidence: true, 
        witnesses: true,
        hearings: {
          orderBy: { date: 'asc' }
        },
        auditLogs: {
          orderBy: { timestamp: 'desc' },
          include: { user: { select: { email: true } } }
        }
      }
    });
  },

  async create(data: CaseCreateData): Promise<Case> {
    const created = await prisma.case.create({
      data: {
        title: data.title,
        status: data.status,
        priority: data.priority || 'Medium',
        date: new Date(data.date),
        description: data.description,
        user: { connect: { id: data.userId } }
      }
    });

    await createAuditLog({
      action: "CREATE",
      entity: "Case",
      entityId: created.id,
      details: `Initialized new case: ${created.title}`,
      userId: data.userId,
      caseId: created.id
    });

    return created;
  },

  async update(id: string, data: Prisma.CaseUpdateInput, performingUserId?: string): Promise<Case | null> {
    const updated = await prisma.case.update({ 
      where: { id }, 
      data 
    });

    if (performingUserId) {
      await createAuditLog({
        action: "UPDATE",
        entity: "Case",
        entityId: id,
        details: `Updated case parameters: ${Object.keys(data).join(', ')}`,
        userId: performingUserId,
        caseId: id
      });
    }

    return updated;
  },

  async remove(id: string, performingUserId?: string): Promise<Case | null> {
    const deleted = await prisma.case.delete({ where: { id } });

    if (performingUserId) {
      await createAuditLog({
        action: "DELETE",
        entity: "Case",
        entityId: id,
        details: `Removed case: ${deleted.title}`,
        userId: performingUserId
      });
    }

    return deleted;
  },
};