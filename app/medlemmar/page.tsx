import { PageTitle } from "@/components/PageTitle";
import { neon } from "@neondatabase/serverless";

type Member = {
  id: string;
  name: string;
};

export const revalidate = 60;

async function getMembers(): Promise<Member[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    SELECT id, name
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

      <section className="w-full max-w-2xl mt-6 rounded-xl bg-background/80 px-6 py-6 md:py-8">
        {members.length === 0 ? (
          <p className="text-sm text-foreground/70">Inga medlemmar ännu.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {members.map((member) => (
              <li key={member.id} className="border-b border-border last:border-b-0 pb-2">
                {member.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

