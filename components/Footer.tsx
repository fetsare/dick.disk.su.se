import Image from "next/image";
import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { NAVIGATION_ITEMS } from "./Navbar";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Discord", href: "https://discord.com" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground/20 bg-background/80 text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 md:flex-row md:items-start md:justify-between">
        {/* Logo left */}
        <div className="flex items-start gap-4">
          <Link href="/" aria-label="Till startsidan">
            <Image
              src="/logs.jpg"
              alt="DICK logo"
              width={96}
              height={96}
              className="h-16 w-16 object-contain md:h-20 md:w-20"
            />
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-8 md:flex-row md:justify-end">
          <div className="min-w-35 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Genvägar
            </h2>
            <nav className="flex flex-col gap-2 text-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationMenuLink
                  key={item.link}
                  href={item.link}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </NavigationMenuLink>
              ))}
            </nav>
          </div>

          <div className="min-w-45 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Kontakt
            </h2>
            <div className="space-y-1 text-sm text-foreground/80">
              <p>DICK - DISKs Interna Catan Klub</p>
              <p>
                E-post:{" "}
                <Link
                  href="mailto:dick@disk.su.se"
                  className="underline-offset-2 hover:underline"
                >
                  dick@disk.su.se
                </Link>
              </p>
            </div>
          </div>

          <div className="min-w-40 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Sociala medier
            </h2>
            <div className="flex flex-col gap-2 text-sm">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
