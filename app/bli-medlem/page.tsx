import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { PageTitle } from "@/components/PageTitle";

export default function BecomeMember() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Sök medlemskap</PageTitle>
      <section className="w-full max-w-xl bg-background/60 rounded-xl px-6 py-6 md:py-8 mb-10">
        <form className="space-y-4 md:space-y-5">
          <FormField
            id="name"
            label="Namn"
            type="text"
            placeholder="Jeffery Epstein"
          />
          <FormField
            id="email"
            label="E-post"
            type="email"
            placeholder="dick@disk.su.se"
          />
          <FormField
            id="motivation"
            label="Motivering"
            as="textarea"
            placeholder="Lignum Habes?"
            rows={4}
          />

          <div className="pt-3 flex">
            <Button
              type="submit"
              className="w-full rounded-full font-minion-bold cursor-pointer"
            >
              Skicka ansökan
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
