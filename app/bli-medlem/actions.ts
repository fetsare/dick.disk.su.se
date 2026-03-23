'use server';

import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';

export async function createMemberRequest(
  _prevState: { error: string | null },
  formData: FormData,
) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  const name = formData.get('name');
  const email = formData.get('email');
  const motivation = formData.get('motivation');

  if (typeof name !== 'string' || typeof email !== 'string' || typeof motivation !== 'string') {
    return { error: 'Ogiltiga formulärvärden.' };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMotivation = motivation.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMotivation) {
    return { error: 'Du måste fylla i alla fält.' };
  }

  // Kontrollera om namnet redan används av en befintlig medlem
  const existingUserByName = await sql`
    SELECT id
    FROM users
    WHERE name ILIKE ${trimmedName}
    LIMIT 1
  `;

  if (existingUserByName.length > 0) {
    return { error: 'Detta namn används redan av en medlem. Välj ett annat.' };
  }

  const existing = await sql`
    SELECT COUNT(*)::int AS count
    FROM member_requests
    WHERE email ILIKE ${trimmedEmail}
  `;

  const count = Number((existing as { count: number }[])[0]?.count ?? 0);

  if (count > 0) {
    return { error: 'Denna e‑postadress har redan använts för en ansökan.' };
  }

  await sql`
    INSERT INTO member_requests (name, email, motivation)
    VALUES (${trimmedName}, ${trimmedEmail}, ${trimmedMotivation})
  `;

  redirect('/bli-medlem/tack');
}
