"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";
import { hashPassword } from "@/lib/hash-password";
import bcrypt from "bcryptjs";

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Du måste vara inloggad." };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (typeof name !== "string" || typeof email !== "string") {
    return { error: "Ogiltiga formulärvärden." };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName || !trimmedEmail) {
    return { error: "Namn och e‑post får inte vara tomma." };
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL är inte satt");
  }

  const sql = neon(databaseUrl);
  let updatePassword = false;
  let passwordHash: string | null = null;

  const hasPasswordFields =
    (typeof currentPassword === "string" && currentPassword.length > 0) ||
    (typeof newPassword === "string" && newPassword.length > 0) ||
    (typeof confirmPassword === "string" && confirmPassword.length > 0);

  if (hasPasswordFields) {
    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return { error: "Ogiltiga lösenordsfält." };
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: "Alla lösenordsfält måste fyllas i." };
    }

    if (newPassword !== confirmPassword) {
      return { error: "Det nya lösenordet matchar inte bekräftelsen." };
    }

    if (newPassword.length < 8) {
      return { error: "Lösenordet måste vara minst 8 tecken långt." };
    }

    // Hämta nuvarande hash för att verifiera nuvarande lösenord
    const rows = await sql`
      SELECT password_hash
      FROM users
      WHERE id = ${user.id}
    `;

    const dbUser = rows[0] as { password_hash: string | null } | undefined;

    if (!dbUser || !dbUser.password_hash) {
      return { error: "Kunde inte verifiera nuvarande lösenord." };
    }

    const isValidCurrent = await bcrypt.compare(
      currentPassword,
      dbUser.password_hash,
    );

    if (!isValidCurrent) {
      return { error: "Nuvarande lösenord är felaktigt." };
    }

    passwordHash = await hashPassword(newPassword);
    updatePassword = true;
  }

  if (updatePassword && passwordHash) {
    await sql`
      UPDATE users
      SET name = ${trimmedName}, email = ${trimmedEmail}, password_hash = ${passwordHash}
      WHERE id = ${user.id}
    `;
  } else {
    await sql`
      UPDATE users
      SET name = ${trimmedName}, email = ${trimmedEmail}
      WHERE id = ${user.id}
    `;
  }

  revalidatePath("/profil");

  return { success: true as const };
}
