import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
        }

        try {
            await AuthService.resetPassword(token, password);
            return NextResponse.json({ message: 'Access key updated successfully.' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Reset failed';
            return NextResponse.json({ error: message }, { status: 400 });
        }
    } catch (error: unknown) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
