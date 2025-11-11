import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import { RouteHandler } from './withHandlers';

export function withAuth(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    const token = req.cookies.get('cmdb_token')?.value;
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // attach user to context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ctx as any).user = payload;
    return handler(req, ctx);
  };
}


