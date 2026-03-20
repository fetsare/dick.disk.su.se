import Image from 'next/image';
import { formatMembershipDuration } from '@/lib/format-membership-duration';

export type MemberCardSize = 'sm' | 'md' | 'lg';

export type MemberCardProps = {
  name: string;
  role?: string;
  profileImageUrl?: string | null;
  createdAt?: string;
  size?: MemberCardSize;
  description?: string | null;
};

const sizeStyles: Record<
  MemberCardSize,
  {
    container: string;
    image: string;
    name: string;
  }
> = {
  sm: {
    container: 'w-40 min-h-40 gap-3 p-4 text-center',
    image: 'h-16 w-16',
    name: 'text-sm',
  },
  md: {
    container: 'w-52 min-h-52 gap-3 p-5 text-center',
    image: 'h-20 w-20',
    name: 'text-base',
  },
  lg: {
    container: 'w-64 min-h-64 gap-4 p-6 text-center',
    image: 'h-24 w-24',
    name: 'text-lg',
  },
};

export function MemberCard({ name, profileImageUrl, createdAt, size = 'md', description }: MemberCardProps) {
  const styles = sizeStyles[size];
  const src = profileImageUrl || '/sheep.jpg';
  const membershipDuration = formatMembershipDuration(createdAt ?? null);

  return (
    <div
      className={`
        flex flex-col items-center rounded-2xl border bg-red-900 backdrop-blur-xl
        ${styles.container}
      `}
    >
      <div className="relative shrink-0">
        <div
          className={`flex items-center justify-center rounded-full  bg-white/80 ${styles.image}`}
        >
          <Image
            src={src}
            alt={name}
            width={260}
            height={260}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Info below */}
      <div className="flex flex-col items-center gap-1">
        <h3
          className={`
            font-minion-bold tracking-[0.12em] uppercase text-royal-gold-400
            ${styles.name}
          `}
        >
          {name}
        </h3>
        {membershipDuration && (
          <p className="mt-1 text-sm text-white">Medlem i {membershipDuration}</p>
        )}
        {description && (
          <p className="mt-1 text-xs text-white/80 max-w-48 whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
