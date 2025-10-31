import prisma from '@/lib/prisma';
import { Case, Prisma } from '@prisma/client';

// Define a type for the raw data coming from the form/API
interface CaseCreateData {
  title: string;
  status: string;
  date: string; // The date is a string from the form
  userId: string;
  description?: string;
}

export const CaseService = {
  async list(): Promise<Case[]> {
    return prisma.case.findMany();
  },

  async get(id: string): Promise<Case | null> {
    return prisma.case.findUnique({ where: { id } });
  },

  // FIX: Update the 'create' function's signature and logic
  async create(data: CaseCreateData): Promise<Case> {
    
    // Transform the raw data into the format Prisma expects
    const prismaData: Prisma.CaseCreateInput = {
      title: data.title,
      status: data.status,
      date: new Date(data.date), // Convert the date string to a Date object
      description: data.description,
      user: { // Use the 'connect' syntax for the relation
        connect: {
          id: data.userId
        }
      }
    };
    
    // Pass the correctly formatted data to Prisma
    return prisma.case.create({ data: prismaData });
  },

  async update(id: string, data: Prisma.CaseUpdateInput): Promise<Case | null> {
    // Note: You will need a similar transformation here if you update cases
    return prisma.case.update({ where: { id }, data });
  },

  async remove(id: string): Promise<Case | null> {
    return prisma.case.delete({ where: { id } });
  },
};