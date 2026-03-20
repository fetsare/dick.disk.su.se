"use client"
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/40 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          onClick={closeMenu}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg p-1 md:h-12 md:w-12">
            <Image
              src="/logos/logs.jpg"
              alt="DICK logo"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="minion-bold text-2xl text-accent md:text-3xl">
            DICK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="minion-bold inline-flex items-center text-xs uppercase tracking-[0.2em] text-foreground transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:hidden"
          aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {isOpen && (
        <nav className="fixed inset-x-0 top-14 z-40 bg-background/95 py-4 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={closeMenu}
                className="minion-bold flex items-center py-2 text-sm uppercase tracking-[0.18em] text-foreground transition hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
