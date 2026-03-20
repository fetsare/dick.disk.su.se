"use server";

import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

export async function createMemberRequest(
  _prevState: { error: string | null },
  formData: FormData,
) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(databaseUrl);

  const name = formData.get("name");
  const email = formData.get("email");
  const motivation = formData.get("motivation");

  if (!name || !email || !motivation) {
    return { error: "Du måste fylla i alla fält." };
  }

  const existing = await sql`
    SELECT COUNT(*)::int AS count
    FROM member_requests
    WHERE email = ${email}
  `;

  const count = Number((existing as { count: number }[])[0]?.count ?? 0);

  if (count > 0) {
    return { error: "Denna e‑postadress har redan använts för en ansökan." };
  }

  await sql`
    INSERT INTO member_requests (name, email, motivation)
    VALUES (${name}, ${email}, ${motivation})
  `;

  redirect("/bli-medlem/tack");
}
