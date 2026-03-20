'use client';
import Link from 'next/link';
import { formatMembershipDuration } from '@/lib/format-membership-duration';
import type { User } from '@/lib/types';

type CardColorVariant = 'green' | 'purple' | 'brown';

interface ExperimentalMemberCardProps {
  member: User & { membershipStartDate: Date | string };
  color?: CardColorVariant;
}

// A Catan-style experimental member card.
export function ExperimentalMemberCard({ member, color = 'purple' }: ExperimentalMemberCardProps) {
  const memberLength = formatMembershipDuration(member.membershipStartDate);

  const profileImageSrc = (typeof member.profile_image_url === 'string' && member.profile_image_url) || '/sheep.jpg';
  const cacheKey =
    typeof member.membershipStartDate === 'string'
      ? member.membershipStartDate
      : member.membershipStartDate?.toISOString?.() || '';
  const cacheBustedProfileImageSrc = cacheKey
    ? `${profileImageSrc}?v=${encodeURIComponent(cacheKey)}`
    : profileImageSrc;

  const titleGradientClass =
    color === 'green'
      ? 'bg-linear-to-b from-[#8fd88a] to-[#3b7a3a]'
      : color === 'brown'
        ? 'bg-linear-to-b from-[#f0b678] to-[#8b4f1f]'
        : 'bg-linear-to-b from-[#8f6ff0] to-[#6b4ea2]';

  return (
    <div className="flex flex-col items-center gap-2 mb-1.5 relative">
      <div className="flex flex-col overflow-hidden h-80 w-48 rounded-2xl bg-[#d8c29a] p-1 shadow-[0_4px_8px_rgba(0,0,0,0.35)] border-8 border-[#d8c29a] text-black font-serif">
        <div
          className={`${titleGradientClass} px-3 py-1.5 text-center text-xs font-semibold tracking-[0.14em] text-black uppercase shadow-[0_2px_3px_rgba(0,0,0,0.4)]`}
        >
          {member.name}
        </div>

        <div className="relative bg-[#c6ddf5] h-96 overflow-hidden">
          {member.colonist_link ? (
            <Link
              href={member.colonist_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cacheBustedProfileImageSrc}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </Link>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cacheBustedProfileImageSrc}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="border-t border-[#b69a6d] bg-[#f5e7c7] px-4 h-full text-center text-[11px] leading-snug text-[#3b2c1c] flex items-center justify-center">
          {member.description && (
            <div className="text-[15px] text-black font-minion-italic max-h-full overflow-hidden text-ellipsis">
              {member.description}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md bg-[#f5e7c7] px-3 py-1 text-[10px] text-[#3b2c1c] shadow-sm border border-[#b69a6d]">
        {memberLength}
      </div>
      {member.colonist_link && (
        <Link
          href={member.colonist_link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -top-3 -right-3 h-10 w-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/colonist.png"
            alt="Colonist"
            className="h-full w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          />
        </Link>
      )}
    </div>
  );
}
