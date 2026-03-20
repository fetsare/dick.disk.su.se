"use client";

import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { createMemberRequest } from "./actions";
import { useActionState } from "react";

const initialState: { error: string | null } = { error: null };

export function BecomeMemberForm() {
  const [state, formAction] = useActionState(createMemberRequest, initialState);

  return (
    <form action={formAction} className="space-y-4 md:space-y-5">
      <FormField
        id="name"
        name="name"
        label="Namn"
        type="text"
        placeholder="Jeffery Epstein"
        required
      />
      <FormField
        id="email"
        name="email"
        label="E-post"
        type="email"
        placeholder="dick@disk.su.se"
        required
      />
      <FormField
        id="motivation"
        name="motivation"
        label="Motivering"
        as="textarea"
        placeholder="Lignum Habes?"
        rows={4}
        required
      />

      {state.error && <p className="text-md text-red-500">{state.error}</p>}

      <Button type="submit" className="w-full mt-2 rounded-full text-lg">
        Skicka ansökan
      </Button>
      <p className="text-md text-black">
        Genom att klicka på Skicka ansökan godkänner du att vi sparar och
        behandlar dina uppgifter i enlighet med GDPR.
      </p>
    </form>
  );
}
