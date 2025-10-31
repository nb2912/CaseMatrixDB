import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded.' });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save the file to the public/uploads directory
  const filePath = join(process.cwd(), 'public', 'uploads', file.name);
  await writeFile(filePath, buffer);

  // Create a new evidence record in the database
  const name = data.get('name') as string;
  const type = data.get('type') as string;
  const caseId = data.get('caseId') as string;

  try {
    const evidence = await prisma.evidence.create({
      data: {
        name,
        type,
        case: { connect: { id: caseId } },
        uploaded: new Date(),
        // You might want to store the file path or URL in the database
        // filePath: `/uploads/${file.name}`,
      },
    });
    return NextResponse.json({ success: true, evidence });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error.' });
  }
};