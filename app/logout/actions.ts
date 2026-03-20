"use server";

import { cookies } from "next/headers";

const SESSION_COOKIE = "session";

export async function serverLogout() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}
