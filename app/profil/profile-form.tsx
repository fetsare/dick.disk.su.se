"use client";

import { useActionState } from "react";
import { PageTitle } from "@/components/PageTitle";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/Button";
import { updateProfile } from "./actions";

type ProfileFormProps = {
  name: string;
  email: string;
  role: "admin" | "member";
};

export function ProfileForm({ name, email, role }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    async (
      _prevState: { error: string | null; success: boolean },
      formData: FormData,
    ) => {
      const result = await updateProfile(formData);
      if (result.error) {
        return { error: result.error, success: false };
      }
      return { error: null, success: true };
    },
    { error: null, success: false },
  );

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Min profil</PageTitle>
      <section className="w-full max-w-lg rounded-xl px-6 py-6 md:py-8 mb-10 bg-background/80">
        <form action={formAction} className="space-y-4 text-sm">
          <FormField id="name" label="Namn" defaultValue={name} />
          <FormField
            id="email"
            label="E‑post"
            type="email"
            defaultValue={email}
          />

          <div>
            <dt className="font-semibold">Roll</dt>
            <dd className="mt-1">{role === "admin" ? "Admin" : "Medlem"}</dd>
          </div>

          <div className="pt-4 border-t border-border/60 space-y-3">
            <h2 className="text-lg">Byt lösenord</h2>
            <p>Lämnda dessa fält tomma om du inte vill uppdatera ditt lösenord</p>
            <FormField
              id="currentPassword"
              label="Nuvarande lösenord"
              type="password"
            />
            <FormField
              id="newPassword"
              label="Nytt lösenord"
              type="password"
            />
            <FormField
              id="confirmPassword"
              label="Bekräfta nytt lösenord"
              type="password"
            />
          </div>

          {state.error && <p className="text-sm text-red-500">{state.error}</p>}
          {state.success && !state.error && (
            <p className="text-sm text-green-600">Profil uppdaterad.</p>
          )}

          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Uppdaterar..." : "Uppdatera"}
          </Button>
        </form>
      </section>
    </div>
  );
}
