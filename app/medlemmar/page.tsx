import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { neon } from "@neondatabase/serverless";
import { MemberCard } from "@/components/MemberCard";
import { pagesMetadata } from "../metadata";

export const metadata: Metadata = pagesMetadata.members;

type Member = {
  id: string;
  name: string;
  role: "member" | "admin";
  profile_image_url?: string | null;
};

export const revalidate = 60;

async function getMembers(): Promise<Member[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    SELECT id, name, role, profile_image_url
    FROM users
    WHERE is_active = TRUE
    ORDER BY name ASC
  `;

  return rows as Member[];
}

export default async function Members() {
  const members = await getMembers();

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 md:py-10">
      <PageTitle>Medlemmar</PageTitle>

      <div
        className="
          mt-6
          grid
          w-full
          max-w-6xl
          grid-cols-2
          gap-4
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {members.map((member) => (
          <div key={member.id} className="flex justify-center">
            <MemberCard
              name={member.name}
              profileImageUrl={member.profile_image_url}
              role={member.role}
              size="md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
