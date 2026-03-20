"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Du måste vara inloggad." };
  }

  const name = formData.get("name");
  const email = formData.get("email");

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

  await sql`
    UPDATE users
    SET name = ${trimmedName}, email = ${trimmedEmail}
    WHERE id = ${user.id}
  `;

  revalidatePath("/profil");

  return { success: true as const };
}
