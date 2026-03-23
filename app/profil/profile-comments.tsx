'use client';

import { useState, useTransition, FormEvent } from 'react';
import type { ProfileComment } from './comments-actions';
import { addProfileComment, getProfileComments } from './comments-actions';
import { Button } from '@/components/Button';

const MAX_COMMENT_LENGTH = 250;

type ProfileCommentsProps = {
  profileUserId: string;
  initialComments: ProfileComment[];
};

export function ProfileComments({ profileUserId, initialComments, isLoggedIn }: ProfileCommentsProps & { isLoggedIn: boolean }) {
  const [comments, setComments] = useState(initialComments);
  const [offset, setOffset] = useState(initialComments.length);
  const [hasMore, setHasMore] = useState(initialComments.length === 10);
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = content.trim();
    if (!trimmed) {
      setError('Kommentaren får inte vara tom.');
      return;
    }
    if (trimmed.length > MAX_COMMENT_LENGTH) {
      setError(`Kommentaren får vara max ${MAX_COMMENT_LENGTH} tecken.`);
      return;
    }

    startTransition(async () => {
      const result = await addProfileComment(profileUserId, trimmed);

      if ('error' in result && result.error) {
        setError(result.error);
        return;
      }

      setComments((prev) => [
        {
          id: `temp-${Date.now()}`,
          profile_user_id: profileUserId,
          author_user_id: 'me',
          author_name: 'Du',
          content: trimmed,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);

      setContent('');
    });
  };

  const handleLoadMore = () => {
    startTransition(async () => {
      const next = await getProfileComments(profileUserId, { offset, limit: 10 });

      setComments((prev) => [...prev, ...next]);
      setOffset((prev) => prev + next.length);
      setHasMore(next.length === 10);
    });
  };

  const remaining = MAX_COMMENT_LENGTH - content.length;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Kommentarer</h2>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
          <textarea
            className="w-full min-h-20 rounded border border-border bg-background/60 px-3 py-2 text-sm"
            placeholder="Skriv en kommentar..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={MAX_COMMENT_LENGTH}
            disabled={isPending}
          />
          <div className="flex items-center justify-between text-xs text-foreground/60">
            <span>{remaining} tecken kvar</span>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button className='w-full' type="submit" disabled={isPending || !content.trim()}>
            {isPending ? 'Skickar...' : 'Skicka kommentar'}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-foreground/70">
          Du måste vara inloggad för att kommentera.{' '}
          <a href="/login" className="underline hover:text-royal-gold-400">
            Logga in här.
          </a>
        </p>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-foreground/70">Inga kommentarer ännu.</p>
        ) : (
          <>
            {comments.map((c) => (
              <div
                key={c.id}
                className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm"
              >
                <div className="flex justify-between gap-2 mb-1">
                  <span className="font-medium text-royal-gold-400">{c.author_name}</span>
                  <span className="text-xs text-foreground/60">
                    {new Date(c.created_at).toLocaleString('sv-SE')}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-foreground/90">{c.content}</p>
              </div>
            ))}

            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button type="button" disabled={isPending} onClick={handleLoadMore}>
                  {isPending ? 'Laddar...' : 'Visa fler kommentarer'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
