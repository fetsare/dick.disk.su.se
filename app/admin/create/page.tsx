import type { Metadata } from 'next';
import { PageTitle } from '@/components/PageTitle';
import { pagesMetadata } from '../../metadata';
import { CreateMemberForm } from './CreateMemberForm';

export const metadata: Metadata = {
  ...pagesMetadata.admin,
  title: 'Skapa konto',
};

export default async function CreateMemberPage() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Skapa konto</PageTitle>

      <section className="w-full max-w-lg rounded-xl px-6 py-6 md:mt-10 border backdrop-blur-xl">
        <CreateMemberForm />
      </section>
    </div>
  );
}
