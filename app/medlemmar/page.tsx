import type { Metadata } from 'next';
import { PageTitle } from '@/components/PageTitle';
import { neon } from '@neondatabase/serverless';
import { MemberCard } from '@/components/MemberCard';
import { pagesMetadata } from '../metadata';

export const metadata: Metadata = pagesMetadata.members;

type Member = {
  id: string;
  name: string;
  profile_image_url?: string | null;
  created_at: string;
};

export const revalidate = 86400;

async function getMembers(): Promise<Member[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
  SELECT id, name, role, profile_image_url, created_at
    FROM users
    WHERE is_active = TRUE
    ORDER BY name ASC
  `;

  return rows as Member[];
}

export default async function Members() {
  const members = await getMembers();

  return (
    <div className="flex flex-col items-center w-full py-8 md:py-10">
      <PageTitle>Medlemmar</PageTitle>

      <div className="mt-6 w-full px-4 sm:px-6 lg:px-8">
        <div
          className="
            mx-auto
            max-w-6xl
            grid
            gap-4
            grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
            sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
            md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
          "
        >
          {members.map((member) => (
            <div key={member.id} className="flex justify-center">
              <MemberCard
                name={member.name}
                profileImageUrl={member.profile_image_url}
                createdAt={member.created_at}
                size="md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/bli-medlem"
          className="inline-flex items-center rounded-md border border-royal-gold-400 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-royal-gold-400 transition-colors hover:bg-royal-gold-400 hover:text-background"
        >
          Bli medlem
        </a>
      </div>
    </div>
  );
}
