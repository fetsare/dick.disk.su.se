'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/Button';
import type { MemberRequest } from './actions';
import { approveRequest, rejectRequest } from './actions';
import { HandledRequestsTable } from './HandledRequestsTable';

type AdminRequestsProps = {
  initialRequests: MemberRequest[];
  initialHandledRequests: MemberRequest[];
};

export function AdminRequests({ initialRequests, initialHandledRequests }: AdminRequestsProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [handledRequests] = useState(initialHandledRequests);
  const [isPending, startTransition] = useTransition();
  const [lastTempPassword, setLastTempPassword] = useState<string | null>(null);
  const [lastEmail, setLastEmail] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    startTransition(async () => {
      const result = await approveRequest(id);
      if (result?.tempPassword) {
        setLastTempPassword(result.tempPassword);
        if (result.email) {
          setLastEmail(result.email);
        }
      }
      setRequests((prev) => prev.filter((r) => r.id !== id));
    });
  };

  const handleReject = (id: string) => {
    startTransition(async () => {
      await rejectRequest(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Väntande ansökningar</h2>
        {requests.length === 0 ? (
          <div className="space-y-3 text-sm">
            <p className="text-foreground/70">Inga väntande ansökningar.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li
                key={req.id}
                className="rounded-lg border border-border bg-background/60 p-4 text-sm flex flex-col gap-3"
              >
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-semibold">Namn:</span> {req.name}
                  </div>
                  <div>
                    <span className="font-semibold">E‑post:</span> {req.email}
                  </div>
                  <div>
                    <span className="font-semibold">Motivation:</span>
                    <p className="mt-1 whitespace-pre-wrap text-foreground/90">{req.motivation}</p>
                  </div>
                  <div className="text-xs text-foreground/60">
                    Skickad: {new Date(req.created_at).toLocaleString('sv-SE')}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button type="button" disabled={isPending} onClick={() => handleApprove(req.id)}>
                    {isPending ? 'Godkänner...' : 'Godkänn'}
                  </Button>

                  <Button type="button" disabled={isPending} onClick={() => handleReject(req.id)}>
                    {isPending ? 'Avslår...' : 'Avslå'}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lastTempPassword && (
          <div className="rounded-md border border-border bg-background/60 p-3 text-sm">
            <p className="font-semibold mb-1">Senast genererade tillfälliga lösenord</p>
            <code className="break-all text-sm">{lastTempPassword}</code>
            <p className="mt-1 text-xs text-foreground/70">
              Kopiera detta lösenord och skicka det till medlemmen via{' '}
              {lastEmail ? (
                <a href={`mailto:${lastEmail}`} className="underline hover:text-royal-gold-400">
                  e‑post
                </a>
              ) : (
                'e‑post'
              )}
              .
            </p>
          </div>
        )}
      </div>

      <HandledRequestsTable requests={handledRequests} />
    </div>
  );
}
