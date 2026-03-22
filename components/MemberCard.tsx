'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import { formatMembershipDuration } from '@/lib/format-membership-duration';
import type { User } from '@/lib/types';

type CardColorVariant = 'green' | 'purple' | 'brown';

interface ExperimentalMemberCardProps {
  member: User & { membershipStartDate: Date | string; updated_at?: string | Date };
  color?: CardColorVariant;
}

export function MemberCard({ member, color = 'purple' }: ExperimentalMemberCardProps) {
  const memberLength = formatMembershipDuration(member.membershipStartDate);
  const profileImageSrc: string =
    typeof member.profile_image_url === 'string' && member.profile_image_url.length > 0
      ? `${member.profile_image_url}?v=${encodeURIComponent(
          (member.updated_at ?? member.id).toString(),
        )}`
      : '/sheep.jpg';

  const titleGradientClass =
    color === 'green'
      ? 'bg-linear-to-b from-[#8fd88a] to-[#3b7a3a]'
      : color === 'brown'
        ? 'bg-linear-to-b from-[#f0b678] to-[#8b4f1f]'
        : 'bg-linear-to-b from-[#8f6ff0] to-[#6b4ea2]';

  return (
    <div className="flex flex-col items-center gap-2 mb-1.5 relative">
      <Link
        href={`/profil/${member.id}`}
        className="flex flex-col overflow-hidden h-80 w-48 rounded-2xl bg-[#d8c29a] p-1 shadow-[0_4px_8px_rgba(0,0,0,0.35)] border-8 border-[#d8c29a] text-black font-serif focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <div
          className={`${titleGradientClass} px-3 py-1.5 text-center text-xs font-semibold tracking-[0.14em] text-black uppercase shadow-[0_2px_3px_rgba(0,0,0,0.4)]`}
        >
          {member.name}
        </div>

        <div className="relative bg-black h-96 overflow-hidden">
          <Image
            src={profileImageSrc}
            alt={member.name}
            fill
            
            sizes="(max-width: 768px) 12rem, 12rem"
            className="object-cover"
          />

          <div className="pointer-events-none absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center text-white">
            <Expand className="h-4 w-4" />
          </div>
        </div>

        <div className="border-t border-[#b69a6d] bg-[#f5e7c7] px-4 h-full text-center text-[11px] leading-snug text-[#3b2c1c] flex items-center justify-center">
          {member.description && (
            <div className="text-[15px] text-black font-minion-italic max-h-full overflow-hidden text-ellipsis">
              {member.description}
            </div>
          )}
        </div>
      </Link>

      <div className="rounded-md bg-[#f5e7c7] px-3 py-1 text-[13px] text-[#3b2c1c] shadow-sm border border-[#b69a6d]">
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
