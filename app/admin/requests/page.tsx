import type { Metadata } from 'next';
import { PageTitle } from '@/components/PageTitle';
import { getPendingRequests, getLatestHandledRequests } from '../actions';
import { AdminRequests } from '../requests-client';
import { pagesMetadata } from '../../metadata';

export const metadata: Metadata = pagesMetadata.admin;

export default async function AdminRequestsPage() {
  const [pendingRequests, handledRequests] = await Promise.all([
    getPendingRequests(),
    getLatestHandledRequests(100),
  ]);

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Ansökningar</PageTitle>

      <section className="w-full max-w-3xl rounded-xl bg-background/80 px-6 py-6 md:py-8 mt-6">
        <AdminRequests initialRequests={pendingRequests} initialHandledRequests={handledRequests} />
      </section>
    </div>
  );
}
