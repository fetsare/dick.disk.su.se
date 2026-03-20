import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/catan.jpg"
          alt="Catan landscape"
          fill
          priority
          className="object-cover brightness-75 blur-xs "
        />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 pb-16 pt-8">
        <section>
          <h1 className="minion-bold mb-4 text-3xl md:text-4xl">
            DICK
          </h1>
          <h2 className="text-1xl md:text-2xl">DISKs Interna Catan Klub</h2>
        </section>
      </div>
    </main>
  );
}
