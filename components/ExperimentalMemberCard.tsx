'use client';
import Image from 'next/image';
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

  const titleGradientClass =
    color === 'green'
      ? 'bg-linear-to-b from-[#8fd88a] to-[#3b7a3a]'
      : color === 'brown'
        ? 'bg-linear-to-b from-[#f0b678] to-[#8b4f1f]'
        : 'bg-linear-to-b from-[#8f6ff0] to-[#6b4ea2]';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex flex-col overflow-hidden h-72 w-48 rounded-2xl bg-[#d8c29a] p-1 shadow-[0_4px_8px_rgba(0,0,0,0.35)] border-8 border-[#d8c29a] text-black font-serif">
        <div
          className={`${titleGradientClass} px-3 py-1.5 text-center text-xs font-semibold tracking-[0.14em] text-black uppercase shadow-[0_2px_3px_rgba(0,0,0,0.4)]`}
        >
          {member.name}
        </div>

        <div className="relative flex-1 bg-[#c6ddf5]">
          <Image
            src={member.profile_image_url || '/sheep.jpg'}
            alt={member.name}
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>

        <div className="border-t border-[#b69a6d] bg-[#f5e7c7] px-4 py-2 text-center text-[11px] leading-snug text-[#3b2c1c]">
          {member.description && (
            <div className="text-[15px] text-black font-minion-italic">
              {member.description}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md bg-[#f5e7c7] px-3 py-1 text-[10px] text-[#3b2c1c] shadow-sm border border-[#b69a6d]">
        {memberLength}
      </div>
    </div>
  );
}
