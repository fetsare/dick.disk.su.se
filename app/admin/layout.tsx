import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch {
    redirect('/');
  }

  return <>{children}</>;
}
