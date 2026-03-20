"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";
import { hashPassword } from "@/lib/hash-password";

export type MemberRequest = {
  id: string;
  email: string;
  name: string;
  motivation: string;
  status: string;
  created_at: string;
};

export async function getPendingRequests(): Promise<MemberRequest[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    SELECT id, email, name, motivation, status, created_at
    FROM member_requests
    WHERE status = 'pending'
    ORDER BY created_at ASC
  `;

  return rows as MemberRequest[];
}

function generateTempPassword(length = 12): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
  let pwd = "";
  const array = new Uint32Array(length);
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pwd += chars[array[i] % chars.length];
    }
    return pwd;
  }

  // Fallback if crypto is not available in this environment
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    pwd += chars[idx];
  }
  return pwd;
}

export async function approveRequest(id: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") {
    throw new Error("Endast admin kan godkänna ansökningar.");
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(databaseUrl);

  // Use a transaction to update the request and create a user
  await sql`BEGIN`;
  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);
  let reqEmail = "";
  try {
    const requests = await sql`
      SELECT id, email, name
      FROM member_requests
      WHERE id = ${id}
        AND status = 'pending'
      LIMIT 1
    `;

    const req = requests[0] as
      | { id: string; email: string; name: string }
      | undefined;

    if (!req) {
      await sql`ROLLBACK`;
      throw new Error("Ansökan hittades inte eller är redan hanterad.");
  }

  reqEmail = req.email;

    await sql`
      UPDATE member_requests
      SET status = 'approved', reviewed_by = ${admin.id}, reviewed_at = NOW()
      WHERE id = ${id}
    `;

    // Create user if not already existing; set password_hash for login
    await sql`
  INSERT INTO users (email, name, role, is_active, password_hash)
  VALUES (${req.email}, ${req.name}, 'member', TRUE, ${passwordHash})
      ON CONFLICT (email) DO NOTHING
    `;

    await sql`COMMIT`;
  } catch (err) {
    await sql`ROLLBACK`;
    throw err;
  }

  revalidatePath("/admin");
  return { tempPassword, email: reqEmail };
}

export async function rejectRequest(id: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") {
    throw new Error("Endast admin kan avslå ansökningar.");
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(databaseUrl);

  await sql`
    UPDATE member_requests
    SET status = 'rejected', reviewed_by = ${admin.id}, reviewed_at = NOW()
    WHERE id = ${id} AND status = 'pending'
  `;

  revalidatePath("/admin");
}
