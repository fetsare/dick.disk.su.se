import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";

export default function VilkorPage() {
  return (
    <div className="flex flex-col items-center w-full px-4 py-8 md:py-10">
      <PageTitle>Work in progress</PageTitle>
      <Image src="/work.jpg" fill alt="work" />
    </div>
  );
}
