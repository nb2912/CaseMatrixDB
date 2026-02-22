import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/chat - Fetch chat history for the user
export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const messages = await prisma.chatMessage.findMany({
            where: { userId },
            orderBy: { timestamp: 'asc' },
        });
        return NextResponse.json(messages);
    } catch (error) {
        console.error('Failed to fetch chat history:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/chat - Save a new chat message
export async function POST(req: NextRequest) {
    try {
        const { userId, role, content } = await req.json();

        if (!userId || !role || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const message = await prisma.chatMessage.create({
            data: {
                userId,
                role,
                content,
            },
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error('Failed to save chat message:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
