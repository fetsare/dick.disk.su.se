"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { serverLogout } from "@/app/logout/actions";

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
  {
    label: "Om oss",
    link: "/om-oss",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/40 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold-400 focus-visible:ring-offset-2"
          onClick={closeMenu}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg p-1 md:h-12 md:w-12">
            <Image
              src="/logos/logs.jpg"
              alt="DICK logo"
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="lettering-reduced text-2xl text-royal-gold-400 md:text-3xl">
            DICK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`minion-bold inline-flex items-center text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:text-sm ${
                pathname === item.link
                  ? "text-royal-gold-400"
                  : "text-foreground hover:text-royal-gold-400"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {!loading &&
            (user ? (
              <>
                <Link
                  href="/profil"
                  className="minion-bold inline-flex items-center text-xs uppercase tracking-[0.2em] text-foreground hover:text-royal-gold-400 md:text-sm"
                >
                  Profil
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    // Clear client auth state and server session cookie
                    startTransition(async () => {
                      await serverLogout();
                      logout();
                      router.push("/");
                    });
                  }}
                  className="minion-bold inline-flex items-center text-xs uppercase tracking-[0.2em] text-foreground hover:text-royal-gold-400 md:text-sm"
                >
                  Logga ut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="minion-bold inline-flex items-center text-xs uppercase tracking-[0.2em] text-foreground hover:text-royal-gold-400 md:text-sm"
              >
                Logga in
              </Link>
            ))}
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-royal-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold-400 focus-visible:ring-offset-2 md:hidden"
          aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {isOpen && (
        <nav className="absolute inset-x-0 top-full z-40 bg-background py-4 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={closeMenu}
                className={`minion-bold flex items-center py-2 text-sm uppercase tracking-[0.18em] transition-colors ${
                  pathname === item.link
                    ? "text-royal-gold-400"
                    : "text-foreground hover:text-royal-gold-400"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {!loading &&
              (user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="minion-bold flex items-center py-2 text-sm uppercase tracking-[0.18em] text-foreground hover:text-royal-gold-400"
                  >
                    Profil
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      startTransition(async () => {
                        await serverLogout();
                        logout();
                        closeMenu();
                        router.push("/");
                      });
                    }}
                    className="minion-bold flex items-center py-2 text-sm uppercase tracking-[0.18em] text-foreground hover:text-royal-gold-400"
                  >
                    Logga ut
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="minion-bold flex items-center py-2 text-sm uppercase tracking-[0.18em] text-foreground hover:text-royal-gold-400"
                >
                  Logga in
                </Link>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}
