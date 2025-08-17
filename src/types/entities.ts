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

export type UserRole = 'user' | 'lawyer' | 'judge';
export type LawyerSpecialization = 'civil' | 'criminal' | 'other';
export interface UserEntity {
  id: ID;
  email: string;
  passwordHash: string; // mock only; do not use in production
  role: UserRole;
  specialization?: LawyerSpecialization; // for lawyers only
  appointedCaseIds?: ID[]; // for lawyers: cases they are appointed to
}

export interface AuthTokenPayload {
  sub: ID;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}


