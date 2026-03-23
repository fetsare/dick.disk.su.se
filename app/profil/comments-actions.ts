'use server';

import { neon } from '@neondatabase/serverless';
import { requireMember } from '@/lib/session';

export type ProfileComment = {
  id: string;
  profile_user_id: string;
  author_user_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

async function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(databaseUrl);
}

export async function getProfileComments(
  profileUserId: string,
  options?: { offset?: number; limit?: number },
): Promise<ProfileComment[]> {
  const sql = await getSql();

  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  const rows = await sql`
    SELECT
      c.id,
      c.profile_user_id,
      c.author_user_id,
      c.content,
      c.created_at,
      u.name AS author_name
    FROM profile_comments AS c
    JOIN users AS u ON u.id = c.author_user_id
    WHERE c.profile_user_id = ${profileUserId}
    ORDER BY c.profile_user_id, c.created_at DESC
  LIMIT ${limit} OFFSET ${offset}
  `;

  return rows as ProfileComment[];
}

export async function addProfileComment(profileUserId: string, content: string) {
  const member = await requireMember(); // ensures logged-in member
  const trimmed = content.trim();

  if (!trimmed) {
    return { error: 'Kommentaren får inte vara tom.' } as const;
  }

  const sql = await getSql();

  await sql`
    INSERT INTO profile_comments (profile_user_id, author_user_id, content)
    VALUES (${profileUserId}, ${member.sub}, ${trimmed})
  `;

  return { success: true as const };
}
