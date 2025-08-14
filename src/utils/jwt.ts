import { AuthTokenPayload, ID } from '@/types/entities';

const DEFAULT_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'dev-secret-change-me';

// Simple HMAC-like mock using base64; replace with real JWT in production
export function generateToken(userId: ID, email: string, ttlSeconds = DEFAULT_TTL_SECONDS): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: AuthTokenPayload = {
    sub: userId,
    email,
    iat: now,
    exp: now + ttlSeconds,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = Buffer.from(data + SECRET).toString('base64url');
  return `${data}.${sig}`;
}

export function verifyToken(token?: string): AuthTokenPayload | null {
  if (!token) return null;
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  const expected = Buffer.from(data + SECRET).toString('base64url');
  if (expected !== sig) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString()) as AuthTokenPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}


