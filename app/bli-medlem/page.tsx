import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { BecomeMemberForm } from "./BecomeMemberForm";
import { pagesMetadata } from "../metadata";

export const metadata: Metadata = pagesMetadata.becomeMember;

export default function BecomeMember() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Sök medlemskap</PageTitle>
      <section className="w-full max-w-lg rounded-xl px-6 py-6 border backdrop-blur-xl">
        <BecomeMemberForm />
      </section>
    </div>
  );
}
