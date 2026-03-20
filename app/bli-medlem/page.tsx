import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BecomeMember() {
  return (
    <main className="relative w-full overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/catan.jpg"
          alt="Catan landscape"
          fill
          priority
          className="object-cover brightness-75 blur-xs"
        />
      </div>

      <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center my-8">
          Sök medlemskap
        </h1>

        <section className="w-full max-w-xl bg-card/90 rounded-xl border border-border/60 shadow-md px-6 py-6 md:py-8 mb-10">
          <form className="space-y-4 md:space-y-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="minion-bold text-sm uppercase tracking-wide"
              >
                Namn
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="min-h-10 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="minion-bold text-sm uppercase tracking-wide"
              >
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="min-h-10 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="motivation"
                className="minion-bold text-sm uppercase tracking-wide"
              >
                Motivering
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows={4}
                className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>

            <div className="pt-3 flex">
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                className="w-full rounded-full text-base minion-bold cursor-pointer"
              >
                Skicka ansökan
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
