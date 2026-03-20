"use server";

import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import type { UserDb } from "@/lib/types";

const SESSION_COOKIE = "session";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Ogiltiga inloggningsuppgifter." };
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL är inte satt");
  }

  const sql = neon(databaseUrl);

  const result = await sql`
    SELECT id, email, name, role, password_hash, created_at, is_active
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  const user = result[0] as UserDb | undefined;

  if (!user || !user.password_hash) {
    return { error: "Fel e‑post eller lösenord." };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { error: "Fel e‑post eller lösenord." };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    JSON.stringify({ id: user.id, role: user.role }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    },
  );

  // Return minimal user info so the client can persist it in localStorage
  return {
    success: true as const,
    user: {
      id: String(user.id),
      role: user.role as "admin" | "member",
    },
  };
}
