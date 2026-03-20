import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PageTitle } from '@/components/PageTitle';
import { getPendingRequests } from './actions';
import { getCurrentUser } from '@/lib/session';
import { AdminRequests } from './requests-client';
import { pagesMetadata } from '../metadata';

export const metadata: Metadata = pagesMetadata.admin;

export default async function Admin() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  const requests = await getPendingRequests();

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Admin</PageTitle>

      <section className="w-full max-w-3xl rounded-xl bg-background/80 px-6 py-6 md:py-8 mt-6">
        <h2 className="minion-bold mb-4 text-sm uppercase tracking-[0.2em] text-foreground/80">
          Medlemsansökningar
        </h2>

        <AdminRequests initialRequests={requests} />
      </section>
    </div>
  );
}
