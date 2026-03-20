import Image from "next/image";
import { PageTitle } from "@/components/PageTitle";

export default function Members() {
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

      <div className="flex flex-col items-center w-full px-4 py-8 md:py-10">
        <PageTitle>Om oss</PageTitle>
      </div>
    </main>
  );
}
