'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/session';
import { hashPassword } from '@/lib/hash-password';
import { generateTempPassword } from '@/lib/generate-temp-password';
import { generateSlugFromName } from '@/lib/slug';

export type MemberRequest = {
  id: string;
  email: string;
  name: string;
  motivation: string;
  status: string;
  created_at: string;
  reviewed_by_name?: string | null;
};

export async function getLatestHandledRequests(limit = 100): Promise<MemberRequest[]> {
  await requireAdmin();
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    SELECT
      mr.id,
      mr.email,
      mr.name,
      mr.motivation,
      mr.status,
      mr.created_at,
      u.name AS reviewed_by_name
    FROM member_requests mr
    LEFT JOIN users u ON u.id = mr.reviewed_by
    WHERE mr.status IN ('approved', 'rejected')
    ORDER BY mr.reviewed_at DESC NULLS LAST, mr.created_at DESC
    LIMIT ${limit}
  `;

  return rows as MemberRequest[];
}

export async function getPendingRequests(): Promise<MemberRequest[]> {
  await requireAdmin();
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
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

export async function approveRequest(id: string) {
  const admin = await requireAdmin();
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  // Use a transaction to update the request and create a user
  await sql`BEGIN`;
  const tempPassword = await generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);
  let reqEmail = '';
  try {
    const requests = await sql`
      SELECT id, email, name
      FROM member_requests
      WHERE id = ${id}
        AND status = 'pending'
      LIMIT 1
    `;

    const req = requests[0] as { id: string; email: string; name: string } | undefined;

    if (!req) {
      await sql`ROLLBACK`;
      throw new Error('Ansökan hittades inte eller är redan hanterad.');
    }

    reqEmail = req.email;

  const slug = generateSlugFromName(req.name);

    await sql`
      UPDATE member_requests
      SET status = 'approved', reviewed_by = ${admin.sub}, reviewed_at = NOW()
      WHERE id = ${id}
    `;

    // Create user if not already existing; set password_hash for login
    await sql`
  INSERT INTO users (email, name, slug, role, is_active, password_hash)
  VALUES (${req.email}, ${req.name}, ${slug}, 'member', TRUE, ${passwordHash})
      ON CONFLICT (email) DO NOTHING
    `;

    await sql`COMMIT`;
  } catch (err) {
    await sql`ROLLBACK`;
    throw err;
  }

  revalidatePath('/admin');
  return { tempPassword, email: reqEmail };
}

export async function createMemberAccount(name: string, email: string) {
  await requireAdmin();
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }
  const sql = neon(databaseUrl);

  await sql`BEGIN`;
  const tempPassword = await generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);
  const slug = generateSlugFromName(name);

  try {
    await sql`
      INSERT INTO users (email, name, slug, role, is_active, password_hash)
      VALUES (${email}, ${name}, ${slug}, 'member', TRUE, ${passwordHash})
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        is_active = TRUE,
        password_hash = EXCLUDED.password_hash
    `;

    await sql`COMMIT`;
  } catch (err) {
    await sql`ROLLBACK`;
    throw err;
  }

  revalidatePath('/admin');
  return { tempPassword, email };
}

export async function rejectRequest(id: string) {
  const admin = await requireAdmin();

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  await sql`
    UPDATE member_requests
    SET status = 'rejected', reviewed_by = ${admin.sub}, reviewed_at = NOW()
    WHERE id = ${id} AND status = 'pending'
  `;

  revalidatePath('/admin');
}
