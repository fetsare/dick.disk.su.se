'use client';

import { useState, useTransition } from 'react';
import { createMemberAccount } from '../actions';
import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';

export function CreateMemberForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ tempPassword: string; email: string } | null>(null);
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
        setResult(created);
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

      {result && (
        <div className="rounded-md border border-border bg-background/60 p-3 text-sm">
          <p className="font-semibold mb-1">Konto skapat</p>
          <p>
            Ett konto har skapats för <span className="font-semibold">{result.email}</span>.
          </p>
          <p className="mt-2 font-semibold">Tillfälligt lösenord:</p>
          <code className="break-all text-sm">{result.tempPassword}</code>
          <p className="mt-1 text-xs text-foreground/70">
            Kopiera detta lösenord och skicka det till medlemmen via{' '}
            <a href={`mailto:${result.email}`} className="underline hover:text-royal-gold-400">
              e‑post
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
