import { CaseEntity, EvidenceEntity, WitnessEntity } from '@/types/entities';

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateCase(input: Partial<CaseEntity>): string[] {
  const errors: string[] = [];
  if (!isNonEmptyString(input.title)) errors.push('title is required');
  if (!isNonEmptyString(input.status)) errors.push('status is required');
  if (!isNonEmptyString(input.date)) errors.push('date is required');
  return errors;
}

export function validateEvidence(input: Partial<EvidenceEntity>): string[] {
  const errors: string[] = [];
  if (!isNonEmptyString(input.caseId)) errors.push('caseId is required');
  if (!isNonEmptyString(input.name)) errors.push('name is required');
  if (!isNonEmptyString(input.type)) errors.push('type is required');
  if (!isNonEmptyString(input.uploaded)) errors.push('uploaded is required');
  return errors;
}

export function validateWitness(input: Partial<WitnessEntity>): string[] {
  const errors: string[] = [];
  if (!isNonEmptyString(input.caseId)) errors.push('caseId is required');
  if (!isNonEmptyString(input.name)) errors.push('name is required');
  if (!isNonEmptyString(input.statement)) errors.push('statement is required');
  return errors;
}


