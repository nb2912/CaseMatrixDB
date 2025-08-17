// Async wrapper for UI usage
export async function getEvidenceByCaseId(caseId: ID): Promise<EvidenceEntity[]> {
  return new Promise(resolve => setTimeout(() => resolve(EvidenceService.list(caseId)), 300));
}
import { EvidenceEntity, ID } from '@/types/entities';
import { evidences, createId } from './data';

export const EvidenceService = {
  list(caseId?: ID): EvidenceEntity[] {
    return caseId ? evidences.filter(e => e.caseId === caseId) : [...evidences];
  },
  get(id: ID): EvidenceEntity | undefined { return evidences.find(e => e.id === id); },
  create(input: Omit<EvidenceEntity, 'id'>): EvidenceEntity {
    const entity: EvidenceEntity = { id: createId(), ...input };
    evidences.push(entity);
    return entity;
  },
  update(id: ID, input: Partial<Omit<EvidenceEntity, 'id'>>): EvidenceEntity | undefined {
    const idx = evidences.findIndex(e => e.id === id);
    if (idx === -1) return undefined;
    evidences[idx] = { ...evidences[idx], ...input };
    return evidences[idx];
  },
  remove(id: ID): boolean {
    const idx = evidences.findIndex(e => e.id === id);
    if (idx === -1) return false;
    evidences.splice(idx, 1);
    return true;
  }
};


