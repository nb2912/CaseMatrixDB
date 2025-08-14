import { CaseEntity, EvidenceEntity, WitnessEntity, UserEntity } from '@/types/entities';
import { randomUUID } from 'crypto';

export const cases: CaseEntity[] = [
  { id: '1', title: 'State vs. John Doe', status: 'Open', date: '2025-08-01', description: 'Criminal case involving John Doe.' },
  { id: '2', title: 'Acme Corp. vs. Smith', status: 'Closed', date: '2025-07-15', description: 'Civil suit regarding contract breach.' },
  { id: '3', title: 'People vs. Jane Roe', status: 'In Progress', date: '2025-08-10', description: 'Ongoing case regarding theft.' },
];

export const evidences: EvidenceEntity[] = [
  { id: 'e1', caseId: '1', name: 'Photo of Crime Scene', type: 'Image', uploaded: '2025-08-01' },
  { id: 'e2', caseId: '1', name: 'Witness Statement', type: 'Document', uploaded: '2025-08-02' },
  { id: 'e3', caseId: '2', name: 'Contract Document', type: 'Document', uploaded: '2025-07-01' },
];

export const witnesses: WitnessEntity[] = [
  { id: 'w1', caseId: '1', name: 'Jane Smith', statement: 'Saw the suspect at the scene.' },
  { id: 'w2', caseId: '1', name: 'Bob Lee', statement: 'Heard loud noises around midnight.' },
];

export const users: UserEntity[] = [
  { id: 'u1', email: 'admin@example.com', passwordHash: 'admin' },
];

export function createId(): string {
  try { return randomUUID(); } catch { return Math.random().toString(36).slice(2); }
}


