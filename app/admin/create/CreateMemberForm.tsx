'use client';

import { useState, useTransition } from 'react';
import { createMemberAccount } from '../actions';
import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { toast } from 'sonner';

export function CreateMemberForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError('Namn och e‑post måste fyllas i.');
      return;
    }

    startTransition(async () => {
      try {
        const created = await createMemberAccount(name.trim(), email.trim());
        if (created?.success) {
          toast.success('Konto skapat. E‑post med inloggningsuppgifter har skickats.');
          setName('');
          setEmail('');
        } else {
          toast.error('Kunde inte skapa konto. Försök igen senare.');
        }
      } catch (err) {
        console.error(err);
        setError('Kunde inte skapa konto. Kontrollera uppgifterna och försök igen.');
      }
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="member-name"
          label="Namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
          placeholder="Namn på medlem"
        />

        <FormField
          id="member-email"
          type="email"
          label="E‑post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          placeholder="medlem@example.com"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          className="mt-4 w-full rounded bg-foreground px-4 py-2 text-background disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? 'Skapar konto...' : 'Skapa konto'}
        </Button>
      </form>
    </div>
  );
}
