import type { Metadata } from 'next';
import { PageTitle } from '@/components/PageTitle';
import { neon } from '@neondatabase/serverless';
import { MemberCard } from '@/components/MemberCard';
import { pagesMetadata } from '../metadata';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const revalidate = 60;
export const metadata: Metadata = pagesMetadata.members;

type Member = {
  id: string;
  name: string;
  slug: string;
  profile_image_url?: string | null;
  created_at: string;
  description?: string | null;
  colonist_link?: string | null;
};

async function getMembers(): Promise<Member[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
  SELECT id, name, slug, role, profile_image_url, created_at, description, colonist_link
    FROM users
    WHERE is_active = TRUE
    ORDER BY created_at ASC
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
            grid-cols-[repeat(auto-fit,minmax(190px,1fr))]
            sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
            md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
          "
        >
          {members.map((member) => (
            <div key={member.id} className="flex justify-center">
              <MemberCard
                member={{
                  id: member.id,
                  email: '',
                  slug: member.slug,
                  name: member.name,
                  role: 'member',
                  created_at: member.created_at,
                  is_active: true,
                  profile_image_url: member.profile_image_url ?? undefined,
                  description: member.description ?? null,
                  colonist_link: member.colonist_link ?? null,
                  membershipStartDate: member.created_at,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Link href={'/bli-medlem'}>
        <Button type="submit" className="mt-2 rounded-full text-lg">
          Ansök om medlemskap
        </Button>
      </Link>
    </div>
  );
}
