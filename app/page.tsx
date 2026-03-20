import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/catan.jpg"
          alt="Catan landscape"
          fill
          priority
          className="object-cover brightness-75 blur-xs "
        />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-10">
        <section className="text-center">
          <PageTitle>DICK</PageTitle>
          <h2 className="text-lg md:text-2xl">DISKs Interna Catan Klub</h2>
        </section>
      </div>
    </main>
  );
}
