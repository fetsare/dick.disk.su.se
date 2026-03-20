import Image from "next/image";
import Link from "next/link";

export interface NavbarItem {
  label: string;
  link: string;
}

export const NAVIGATION_ITEMS: NavbarItem[] = [
  {
    label: "Hem",
    link: "/",
  },
  {
    label: "Medlemmar",
    link: "/medlemmar",
  },
  {
    label: "Bli medlem",
    link: "/bli-medlem",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-transparent px-6 py-4">
      <Link href="/" className="flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg p-1 md:h-14 md:w-14">
          <Image
            src="/logos/logs.jpg"
            alt="DICK logo"
            width={56}
            height={56}
            className="h-full w-full object-contain"
          />
        </div>
        <span className="minion-bold text-2xl text-accent md:text-3xl">
          DICK
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            className="minion-bold inline-flex items-center text-sm uppercase tracking-[0.2em] text-foreground/90 transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:text-base"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
