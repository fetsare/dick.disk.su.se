import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex-1 w-full overflow-hidden">
      <Image
        src="/catan.jpg"
        alt="Catan landscape"
        fill
        priority
        className="object-cover"
      />
      <h1>Hello world</h1>
    </div>
  );
}
