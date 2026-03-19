import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col  h-screen items-center justify-center text-center">
      <h1 className="text-4xl font-minion-bold">DICK</h1>
      <h2 className="text-2xl font-minion-italic mb-8">DISKs Interna Catan Klub</h2>
      <Image src="/logs.jpg" width={200} height={300} alt="logs" />
    </div>
  );
}
