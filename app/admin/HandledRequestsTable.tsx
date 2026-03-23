import type { MemberRequest } from './actions';

export type HandledRequestsTableProps = {
  requests: MemberRequest[];
};

export function HandledRequestsTable({ requests }: HandledRequestsTableProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">Senaste hanterade ansökningar</h2>
      {requests.length === 0 ? (
        <p className="text-sm text-foreground/70">Inga hanterade ansökningar ännu.</p>
      ) : (
        <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/60">
                <th className="py-2 pr-3">Namn</th>
                <th className="py-2 px-3">E‑post</th>
                <th className="py-2 px-3">Status</th>
        <th className="py-2 px-3">Skickad</th>
        <th className="py-2 pl-3 text-right">Granskad av</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-border/60 last:border-b-0">
                  <td className="py-2 pr-3 align-top font-medium text-foreground/90">{req.name}</td>
                  <td className="py-2 px-3 align-top text-foreground/80">{req.email}</td>
                  <td className="py-2 px-3 align-top">
                    <span
                      className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border ${
                        req.status === 'approved'
                          ? 'border-emerald-500/60 text-emerald-500/90'
                          : 'border-rose-500/60 text-rose-500/90'
                      }`}
                    >
                      {req.status === 'approved' ? 'Godkänd' : 'Avslagen'}
                    </span>
                  </td>
                  <td className="py-2 px-3 align-top text-xs text-foreground/70">
                    {new Date(req.created_at).toLocaleString('sv-SE')}
                  </td>
                  <td className="py-2 pl-3 align-top text-xs text-foreground/80 text-right">
                    {req.reviewed_by_name ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
