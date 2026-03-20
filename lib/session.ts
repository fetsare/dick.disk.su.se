"use server";

import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";
import type { UserDb } from "@/lib/types";

const SESSION_COOKIE = "session";

export async function getCurrentUser(): Promise<UserDb | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;

  if (!value) return null;

  let parsed: { id: string; role?: string } | null = null;
  try {
    parsed = JSON.parse(value);
  } catch {
    return null;
  }

  if (!parsed?.id) return null;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL är inte satt");
  }

  const sql = neon(databaseUrl);

  const result = await sql`
    SELECT id, email, name, role, password_hash, created_at, is_active
    FROM users
    WHERE id = ${parsed.id}
      AND is_active = TRUE
    LIMIT 1
  `;

  const user = result[0] as UserDb | undefined;
  return user ?? null;
}
