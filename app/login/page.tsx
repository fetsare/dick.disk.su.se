import { PageTitle } from "@/components/PageTitle";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-10">
      <PageTitle>Logga in</PageTitle>
      <section className="w-full max-w-lg rounded-xl px-6 py-6">
        <LoginForm />
      </section>
    </div>
  );
}
