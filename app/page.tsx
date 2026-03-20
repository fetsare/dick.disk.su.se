import { PageTitle } from "@/components/PageTitle";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-10">
      <section className="text-center">
        <PageTitle>DICK</PageTitle>
        <h2 className="text-lg md:text-2xl">DISKs Interna Catan Klub</h2>
      </section>
    </div>
  );
}
