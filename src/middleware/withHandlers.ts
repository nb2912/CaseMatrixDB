import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteHandler = (req: NextRequest, ctx: any) => Promise<NextResponse> | NextResponse;

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (err: unknown) {
      console.error('API Error:', err);
      const message = err instanceof Error ? err.message : 'Internal Server Error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}

export function withLogging(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    const start = Date.now();
    const res = await handler(req, ctx);
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.nextUrl.pathname} -> ${res.status} (${ms}ms)`);
    return res;
  };
}


