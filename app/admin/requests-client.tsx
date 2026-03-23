'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/Button';
import type { MemberRequest } from './actions';
import { approveRequest, rejectRequest } from './actions';
import { toast } from 'sonner';

type AdminRequestsProps = {
  initialRequests: MemberRequest[];
};

export function AdminRequests({ initialRequests }: AdminRequestsProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [isPending, startTransition] = useTransition();

  const handleApprove = (id: string) => {
    startTransition(async () => {
      try {
        const result = await approveRequest(id);
        if (result?.success) {
          setRequests((prev) => prev.filter((r) => r.id !== id));
          toast.success('Ansökan godkänd. E‑post med inloggningsuppgifter har skickats.');
        } else {
          toast.error('Kunde inte godkänna ansökan.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Något gick fel vid godkännande av ansökan.');
      }
    });
  };

  const handleReject = (id: string) => {
    startTransition(async () => {
      try {
        await rejectRequest(id);
        setRequests((prev) => prev.filter((r) => r.id !== id));
        toast.success('Ansökan har avslagits.');
      } catch (err) {
        console.error(err);
        toast.error('Något gick fel vid avslag av ansökan.');
      }
    });
  };

  if (requests.length === 0) {
    return (
      <div className="space-y-3 text-sm">
        <p className="text-foreground/70">Inga väntande ansökningar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
    </div>
  );
}
