import type { Metadata } from 'next';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { pagesMetadata } from '../../metadata';

export const metadata: Metadata = pagesMetadata.becomeMemberThanks;

export default function MembershipThankYou() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Tack för din ansökan</PageTitle>
      <section className="flex flex-col items-center w-full max-w-xl bg-background/60 rounded-xl px-6 py-6 md:py-8 mb-10">
        <p className="text-lg mb-6">
          Vi har tagit emot din ansökan om medlemskap. DICKtaturen kommer att gå igenom den och
          återkommer till dig via e‑post.
        </p>
        <Link href="/">
          <Button className="rounded-full font-minion-bold">Till startsidan</Button>
        </Link>
      </section>
    </div>
  );
}
