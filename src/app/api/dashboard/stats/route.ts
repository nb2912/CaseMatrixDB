import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalCases,
      totalEvidence,
      totalWitnesses,
      statusDistribution,
      priorityDistribution,
      recentLogs
    ] = await Promise.all([
      prisma.case.count(),
      prisma.evidence.count(),
      prisma.witness.count(),
      prisma.case.groupBy({
        by: ['status'],
        _count: true,
      }),
      prisma.case.groupBy({
        by: ['priority'],
        _count: true,
      }),
      prisma.auditLog.findMany({
        take: 5,
        orderBy: { timestamp: 'desc' },
        include: { user: { select: { email: true } } }
      })
    ]);

    return NextResponse.json({
      counts: {
        cases: totalCases,
        evidence: totalEvidence,
        witnesses: totalWitnesses,
      },
      statusDistribution: statusDistribution.map(item => ({
        name: item.status,
        value: item._count,
      })),
      priorityDistribution: priorityDistribution.map(item => ({
        name: item.priority,
        value: item._count,
      })),
      recentLogs: recentLogs.map(log => ({
        id: log.id,
        action: log.action,
        entity: log.entity,
        user: log.user.email.split('@')[0],
        time: log.timestamp,
      }))
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
