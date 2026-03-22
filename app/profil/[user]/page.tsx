import { notFound } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import Image from 'next/image';
import { PageTitle } from '@/components/PageTitle';

export const revalidate = 60;

interface ProfilePageProps {
  params: { user: string };
}

type Member = {
  id: string;
  name: string;
  profile_image_url?: string | null;
  created_at: string;
  description?: string | null;
  colonist_link?: string | null;
};

async function getMemberById(id: string): Promise<Member | null> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    SELECT id, name, profile_image_url, created_at, description, colonist_link
    FROM users
    WHERE id = ${id} AND is_active = TRUE
    LIMIT 1
  `;

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0] as Member;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { user } = params;

  const member = await getMemberById(user);

  if (!member) {
    notFound();
  }

  const hasDescription = Boolean(member.description && member.description.trim().length > 0);

  return (
    <div className="flex flex-col items-center w-full py-8 md:py-10">
      <PageTitle>{member.name}</PageTitle>

      <div className="mt-6 flex justify-center">
        <div className="relative h-40 w-40 rounded-full overflow-hidden border border-border bg-muted/40 shadow-sm md:h-48 md:w-48">
          {member.profile_image_url ? (
            <Image
              src={member.profile_image_url}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 10rem, 12rem"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-foreground/60">
              Ingen bild
            </div>
          )}
        </div>
      </div>

      {hasDescription && (
        <section className="mt-8 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-background/70 p-4 shadow-sm">
            <h2 className="minion-bold mb-2 text-xs uppercase tracking-[0.18em] text-foreground/70">
              Beskrivning
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
              {member.description}
            </p>
          </div>
        </section>
      )}

      {member.colonist_link && (
        <section className="mt-4 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-background/70 p-4 shadow-sm flex items-center justify-between gap-3">
            <div>
              <h2 className="minion-bold text-xs uppercase tracking-[0.18em] text-foreground/70">
                Colonist-profil
              </h2>
              <p className="mt-1 text-sm text-foreground/90 break-all">
                {member.colonist_link}
              </p>
            </div>
            <a
              href={member.colonist_link}
              target="_blank"
              rel="noopener noreferrer"
              className="minion-bold inline-flex items-center rounded-md border border-royal-gold-400 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-royal-gold-400 transition-colors hover:bg-royal-gold-400 hover:text-background"
            >
              Öppna
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
