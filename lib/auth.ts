import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const key = new TextEncoder().encode(SECRET_KEY);

export interface SessionData {
  username: string;
  isAdmin: boolean;
  expiresAt: number;
}

// In production, store these in a database with hashed passwords
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123', // Change this!
};

export async function encrypt(payload: SessionData): Promise<string> {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as SessionData;
  } catch (error) {
    return null;
  }
}

export async function createSession(username: string): Promise<string> {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const session: SessionData = {
    username,
    isAdmin: true,
    expiresAt,
  };
  
  const token = await encrypt(session);
  
  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
  
  return token;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  
  if (!token) return null;
  
  const session = await decrypt(token);
  
  if (!session || session.expiresAt < Date.now()) {
    return null;
  }
  
  return session;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}
