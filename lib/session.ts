'use server';

import { cookies } from 'next/headers';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';
import type { UserDb, UserRole } from '@/lib/types';

const SESSION_COOKIE = 'session';

type JwtPayload = { sub?: string; role?: UserRole };

export async function getJwtPayload(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET är inte satt');
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as JwtPayload;
    return payload;
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<JwtPayload & { sub: string; role: 'admin' }> {
  const payload = await getJwtPayload();

  if (!payload || payload.role !== 'admin' || !payload.sub) {
    throw new Error('Inte behörig: admin krävs');
  }

  return { sub: payload.sub, role: 'admin' };
}

export async function requireMember(): Promise<
  JwtPayload & { sub: string; role: 'member' | 'admin' }
> {
  const payload = await getJwtPayload();

  if (!payload || (payload.role !== 'member' && payload.role !== 'admin') || !payload.sub) {
    throw new Error('Inte behörig: member krävs');
  }

  return { sub: payload.sub, role: payload.role as 'member' | 'admin' };
}

export async function getCurrentUser(): Promise<UserDb | null> {
  const payload = await getJwtPayload();
  if (!payload?.sub) return null;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL är inte satt');
  }

  const sql = neon(databaseUrl);

  const result = await sql`
  SELECT id, email, name, slug, role, password_hash, created_at, is_active, title, profile_image_url, description, colonist_link
    FROM users
    WHERE id = ${payload.sub}
      AND is_active = TRUE
    LIMIT 1
  `;

  const user = result[0] as UserDb | undefined;
  return user ?? null;
}
