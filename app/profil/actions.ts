'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/session';
import { hashPassword } from '@/lib/hash-password';
import bcrypt from 'bcryptjs';
import { del, put } from '@vercel/blob';

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'Du måste vara inloggad.' };
  }

  const name = formData.get('name');
  const email = formData.get('email');
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');
  const confirmPassword = formData.get('confirmPassword');
  const description = formData.get('description');
  const colonistLink = formData.get('colonist_link');

  if (typeof name !== 'string' || typeof email !== 'string') {
    return { error: 'Ogiltiga formulärvärden.' };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedDescription =
    typeof description === 'string' && description.trim().length > 0 ? description.trim() : null;
  const trimmedColonistLink =
    typeof colonistLink === 'string' && colonistLink.trim().length > 0 ? colonistLink.trim() : null;

  if (!trimmedName || !trimmedEmail) {
    return { error: 'Namn och e‑post får inte vara tomma.' };
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL är inte satt');
  }

  const sql = neon(databaseUrl);
  let updatePassword = false;
  let passwordHash: string | null = null;

  const hasPasswordFields =
    (typeof currentPassword === 'string' && currentPassword.length > 0) ||
    (typeof newPassword === 'string' && newPassword.length > 0) ||
    (typeof confirmPassword === 'string' && confirmPassword.length > 0);

  if (hasPasswordFields) {
    if (
      typeof currentPassword !== 'string' ||
      typeof newPassword !== 'string' ||
      typeof confirmPassword !== 'string'
    ) {
      return { error: 'Ogiltiga lösenordsfält.' };
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: 'Alla lösenordsfält måste fyllas i.' };
    }

    if (newPassword !== confirmPassword) {
      return { error: 'Det nya lösenordet matchar inte bekräftelsen.' };
    }

    if (newPassword.length < 8) {
      return { error: 'Lösenordet måste vara minst 8 tecken långt.' };
    }

    // Hämta nuvarande hash för att verifiera nuvarande lösenord
    const rows = await sql`
      SELECT password_hash
      FROM users
      WHERE id = ${user.id}
    `;

    const dbUser = rows[0] as { password_hash: string | null } | undefined;

    if (!dbUser || !dbUser.password_hash) {
      return { error: 'Kunde inte verifiera nuvarande lösenord.' };
    }

    const isValidCurrent = await bcrypt.compare(currentPassword, dbUser.password_hash);

    if (!isValidCurrent) {
      return { error: 'Nuvarande lösenord är felaktigt.' };
    }

    passwordHash = await hashPassword(newPassword);
    updatePassword = true;
  }

  if (updatePassword && passwordHash) {
    await sql`
      UPDATE users
  SET name = ${trimmedName}, email = ${trimmedEmail}, description = ${trimmedDescription}, colonist_link = ${trimmedColonistLink}, password_hash = ${passwordHash}, updated_at = NOW()
      WHERE id = ${user.id}
    `;
  } else {
    await sql`
      UPDATE users
  SET name = ${trimmedName}, email = ${trimmedEmail}, description = ${trimmedDescription}, colonist_link = ${trimmedColonistLink}, updated_at = NOW()
      WHERE id = ${user.id}
    `;
  }

  revalidatePath('/profil');

  return { success: true as const };
}

export async function uploadProfileImage(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Du måste vara inloggad.' };
  }

  const file = formData.get('profileImage');
  if (!(file instanceof File)) {
    return { error: 'Ogiltig bildfil.' };
  }

  if (!file.type.startsWith('image/')) {
    return { error: 'Endast bildfiler är tillåtna.' };
  }

  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { error: 'Bilden får vara max 5 MB.' };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN är inte satt');
  }
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL är inte satt');
  }

  const sql = neon(databaseUrl);
  const rows = await sql`
    SELECT profile_image_url
    FROM users
    WHERE id = ${user.id}
    LIMIT 1
  `;
  const existing = rows[0] as { profile_image_url: string | null } | undefined;
  const oldUrl = existing?.profile_image_url ?? null;

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const blobKey = `profiles/${user.id}/${timestamp}-${sanitizedName}`;

  const blob = await put(blobKey, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const newUrl = blob.url;

  await sql`
    UPDATE users
    SET profile_image_url = ${newUrl}, updated_at = NOW()
    WHERE id = ${user.id}
  `;

  // Försök ta bort gammal blob om den låg i samma Vercel Blob-bucket
  if (oldUrl) {
    try {
      const oldUrlObj = new URL(oldUrl);
      const oldKey = oldUrlObj.pathname.replace(/^\/+/, '');
      if (oldKey) {
        await del(oldKey, { token: process.env.BLOB_READ_WRITE_TOKEN });
      }
    } catch {
    }
  }

  revalidatePath('/profil');
  revalidatePath('/medlemmar');

  return { success: true as const, url: newUrl };
}
