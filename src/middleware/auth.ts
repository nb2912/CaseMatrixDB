import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import { RouteHandler } from './withHandlers';

export function withAuth(handler: RouteHandler, allowedRoles?: string[]): RouteHandler {
  return async (req, ctx) => {
    const token = req.cookies.get('cmdb_token')?.value;
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (allowedRoles && !allowedRoles.includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: Insufficient Permissions' }, { status: 403 });
    }

    // attach user to context
    (ctx as any).user = payload;
    return handler(req, ctx);
  };
}


