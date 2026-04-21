import prisma from "./prisma";

export async function createAuditLog(data: {
  action: string;
  entity: string;
  entityId: string;
  details: string;
  userId: string;
  caseId?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        details: data.details,
        userId: data.userId,
        caseId: data.caseId,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}
