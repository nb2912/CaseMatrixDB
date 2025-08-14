import { WitnessEntity, ID } from '@/types/entities';
import { witnesses, createId } from './data';

export const WitnessService = {
  list(caseId?: ID): WitnessEntity[] {
    return caseId ? witnesses.filter(w => w.caseId === caseId) : [...witnesses];
  },
  get(id: ID): WitnessEntity | undefined { return witnesses.find(w => w.id === id); },
  create(input: Omit<WitnessEntity, 'id'>): WitnessEntity {
    const entity: WitnessEntity = { id: createId(), ...input };
    witnesses.push(entity);
    return entity;
  },
  update(id: ID, input: Partial<Omit<WitnessEntity, 'id'>>): WitnessEntity | undefined {
    const idx = witnesses.findIndex(w => w.id === id);
    if (idx === -1) return undefined;
    witnesses[idx] = { ...witnesses[idx], ...input };
    return witnesses[idx];
  },
  remove(id: ID): boolean {
    const idx = witnesses.findIndex(w => w.id === id);
    if (idx === -1) return false;
    witnesses.splice(idx, 1);
    return true;
  }
};


