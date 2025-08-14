export type ID = string;

export interface CaseEntity {
  id: ID;
  title: string;
  status: 'Open' | 'Closed' | 'Pending' | 'In Progress';
  date: string; // ISO string
  description?: string;
}

export interface EvidenceEntity {
  id: ID;
  caseId: ID;
  name: string;
  type: 'Document' | 'Photo' | 'Video' | 'Audio' | 'Image' | 'Other';
  uploaded: string; // ISO string
}

export interface WitnessEntity {
  id: ID;
  caseId: ID;
  name: string;
  statement: string;
}

export interface UserEntity {
  id: ID;
  email: string;
  passwordHash: string; // mock only; do not use in production
}

export interface AuthTokenPayload {
  sub: ID;
  email: string;
  iat: number;
  exp: number;
}


