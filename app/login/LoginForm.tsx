'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { login } from './actions';
import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { useAuth } from '@/lib/auth-context';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="mt-4 w-full rounded bg-foreground px-4 py-2 text-background disabled:opacity-60"
      disabled={pending}
    >
      {pending ? 'Loggar in...' : 'Logga in'}
    </Button>
  );
}

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login: setAuthUser } = useAuth();

  return (
    <form
      action={async (formData) => {
        setError(null);
        const result = await login(formData);
        if (result?.error) {
          setError(result.error);
          return;
        }

        if (result?.success && result.user) {
          setAuthUser(result.user);

          if (result.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        }
      }}
      className="space-y-4"
    >
      <FormField
        id="email"
        type="email"
        label="E‑post"
        required
        className="w-full"
        placeholder="lokalansvarig@disk.su.se"
      />

      <FormField
        id="password"
        type="password"
        label="Lösenord"
        required
        className="w-full"
        placeholder="varförVinnerAlltidCarl?123"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      <SubmitButton />
    </form>
  );
}
