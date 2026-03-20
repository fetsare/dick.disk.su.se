'use client';

import { useActionState, useRef, useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { FormField } from '@/components/FormField';
import { Button } from '@/components/Button';
import { updateProfile, uploadProfileImage } from './actions';

type ProfileFormProps = {
  name: string;
  email: string;
  role: 'admin' | 'member';
  profileImageUrl?: string | null;
  description?: string | null;
};
export function ProfileForm({ name, email, role, profileImageUrl, description, colonist_link }: ProfileFormProps & { colonist_link?: string | null }) {
  const [state, formAction, pending] = useActionState(
    async (_prevState: { error: string | null; success: boolean }, formData: FormData) => {
      const result = await updateProfile(formData);
      if (result.error) {
        return { error: result.error, success: false };
      }
      return { error: null, success: true };
    },
    { error: null, success: false },
  );

  const [imageState, imageAction, imagePending] = useActionState(
    async (_prevState: { error: string | null; success: boolean }, formData: FormData) => {
      const result = await uploadProfileImage(formData);
      if (result.error) {
        return { error: result.error, success: false };
      }
      return { error: null, success: true };
    },
    { error: null, success: false },
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Min profil</PageTitle>
      <section className="w-full max-w-lg rounded-xl px-6 py-6 md:py-8 mb-10 bg-background/80">
        <form action={formAction} className="space-y-4 text-sm">
          <FormField id="name" label="Namn" defaultValue={name} />
          <FormField id="email" label="E‑post" type="email" defaultValue={email} />

          <FormField
            id="description"
            label="Beskrivning"
            as="textarea"
            rows={3}
            defaultValue={description ?? ''}
          />

          <FormField
            id="colonist_link"
            label="Colonist.io-länk"
            defaultValue={colonist_link ?? ''}
          />

          <div>
            <dt className="font-semibold">Roll</dt>
            <dd className="mt-1">{role === 'admin' ? 'Admin' : 'Medlem'}</dd>
          </div>

          <div className="pt-4 border-t border-border/60 space-y-3">
            <h2 className="text-lg">Byt lösenord</h2>
            <p>Lämnda dessa fält tomma om du inte vill uppdatera ditt lösenord</p>
            <FormField id="currentPassword" label="Nuvarande lösenord" type="password" />
            <FormField id="newPassword" label="Nytt lösenord" type="password" />
            <FormField id="confirmPassword" label="Bekräfta nytt lösenord" type="password" />
          </div>

          {state.error && <p className="text-sm text-red-500">{state.error}</p>}
          {state.success && !state.error && (
            <p className="text-sm text-green-600">Profil uppdaterad.</p>
          )}

          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? 'Uppdaterar...' : 'Uppdatera'}
          </Button>
        </form>
      </section>

      <section className="w-full max-w-lg rounded-xl px-6 py-6 md:py-8 bg-background/80">
        <h2 className="text-lg mb-4">Profilbild</h2>

        {profileImageUrl && (
          <div className="mb-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImageUrl}
              alt="Profilbild"
              className="h-24 w-24 rounded-full object-cover border border-border"
            />
          </div>
        )}

        <form action={imageAction} className="space-y-4 text-sm">
          <input
            ref={fileInputRef}
            type="file"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedFileName(file ? file.name : null);
            }}
          />

          <div className="flex items-center gap-3">
            <Button
              type="button"
              className="w-auto text-black bg-royal-gold-400 px-4 py-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Välj bild
            </Button>
            <span className="text-xs text-foreground/70 truncate">
              {selectedFileName ?? 'Ingen fil vald'}
            </span>
          </div>

          {imageState.error && <p className="text-sm text-red-500">{imageState.error}</p>}
          {imageState.success && !imageState.error && (
            <p className="text-sm text-green-600">Profilbild uppdaterad.</p>
          )}

          <Button className="w-full" type="submit" disabled={imagePending}>
            {imagePending ? 'Laddar upp...' : 'Ladda upp bild'}
          </Button>
        </form>
      </section>
    </div>
  );
}
