import { redirect } from 'next/navigation';

export default async function Admin() {
  const { getCurrentUser } = await import('@/lib/session');
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  redirect('/admin/requests');
}

