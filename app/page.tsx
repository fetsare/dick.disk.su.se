import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-4 min-h-[70vh]">
      <section className="text-center flex flex-col items-center gap-4">
        <PageTitle>DICK</PageTitle>
        <h2 className="text-lg md:text-2xl">DISKs Interna Catan Klub</h2>
        <Image
          src="/Catan-2015-boxart.jpg"
          alt="Catan box art"
          width={308}
          height={250}
          className="w-full max-w-xs rounded shadow-lg"
          priority
        />
      </section>
    </div>
  );
}
