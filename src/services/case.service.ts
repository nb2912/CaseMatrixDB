import { CaseEntity, ID } from '@/types/entities';
import { cases, createId } from './data';

export const CaseService = {
  list(): CaseEntity[] { return [...cases]; },
  get(id: ID): CaseEntity | undefined { return cases.find(c => c.id === id); },
  create(input: Omit<CaseEntity, 'id'>): CaseEntity {
    const entity: CaseEntity = { id: createId(), ...input };
    cases.push(entity);
    return entity;
  },
  update(id: ID, input: Partial<Omit<CaseEntity, 'id'>>): CaseEntity | undefined {
    const idx = cases.findIndex(c => c.id === id);
    if (idx === -1) return undefined;
    cases[idx] = { ...cases[idx], ...input };
    return cases[idx];
  },
  remove(id: ID): boolean {
    const idx = cases.findIndex(c => c.id === id);
    if (idx === -1) return false;
    cases.splice(idx, 1);
    return true;
  }
};


