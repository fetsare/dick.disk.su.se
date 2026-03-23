import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import Image from 'next/image';
import { PageTitle } from '@/components/PageTitle';
import { formatMembershipDuration } from '@/lib/format-membership-duration';

type Member = {
  id: string;
  name: string;
  profile_image_url?: string | null;
  created_at: string;
  updated_at?: string;
  description?: string | null;
  colonist_link?: string | null;
};

async function getMemberBySlug(slug: string): Promise<Member | null> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    SELECT id, name, profile_image_url, created_at, description, colonist_link
    FROM users
    WHERE slug ILIKE ${slug} AND is_active = TRUE
    LIMIT 1
  `;

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0] as Member;
}

export async function generateMetadata(props: {
  params: Promise<{ user: string }>;
}): Promise<Metadata> {
  const { params } = props;
  const { user } = await params;

  const member = await getMemberBySlug(user);

  if (!member) {
    return {
      title: 'Profil',
    };
  }

  const title = member.name;

  const description = member.description?.trim() || undefined;

  const images = member.profile_image_url
    ? [
        {
          url: member.profile_image_url,
          alt: member.name,
        },
      ]
    : undefined;

  return {
    title,
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
  };
}

export default async function ProfilePage(props: { params: Promise<{ user: string }> }) {
  const { params } = props;
  const { user } = await params;

  const member = await getMemberBySlug(user);

  if (!member) {
    notFound();
  }

  const hasDescription = Boolean(member.description && member.description.trim().length > 0);
  const memberLength = formatMembershipDuration(member.created_at);

  return (
    <div className="flex flex-col items-center w-full py-8 md:py-10">
      <PageTitle>{member.name}</PageTitle>

      <div className="mt-6 flex justify-center">
        <div className="relative h-48 w-48 rounded-full overflow-hidden border md:h-64 md:w-64">
          {member.profile_image_url ? (
            <a href={member.profile_image_url} target="_blank" rel="noopener noreferrer">
              <div className="relative h-48 w-48 md:h-64 md:w-64">
                <Image
                  src={member.profile_image_url}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 10rem, 12rem"
                  className="object-cover"
                />
              </div>
            </a>
          ) : (
            <div className="relative h-48 w-48 md:h-64 md:w-64">
              <Image
                src="/sheep.jpg"
                alt="Ingen profilbild"
                fill
                sizes="(max-width: 768px) 10rem, 12rem"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {hasDescription && (
        <section className="m-8 flex flex-col gap-4">
          <div className="border-4 max-w-80 border-[#b69a6d] bg-[#f5e7c7] px-4 h-full text-center text-[11px] leading-snug text-[#3b2c1c] flex items-center justify-center rounded-md">
            {member.description && (
              <div className="p-2 text-[15px] text-black font-minion-italic max-h-full overflow-hidden text-ellipsis">
                {member.description}
              </div>
            )}
          </div>

          <p className="text-md text-center">Har varit medlem i {memberLength}</p>
          {member.colonist_link && (
            <div className="flex justify-center">
              <a
                href={member.colonist_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-md hover:underline"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/colonist.png" alt="Colonist" className="h-6 w-6 object-contain" />
                <span>Spela med {member.name} på Colonist</span>
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
