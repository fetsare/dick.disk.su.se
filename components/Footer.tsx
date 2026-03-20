"use client"
import Image from "next/image";
import Link from "next/link";
import { NAVIGATION_ITEMS } from "./Navbar";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/studentkarendisk/" },
  { label: "Facebook", href: "https://www.facebook.com/diskstudentkar" },
  { label: "Discord", href: "https://discord.gg/q9JXFJjmQ4" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10">
        <div className="grid w-full gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start md:justify-center">
          <div className="space-y-4">
            <h2 className="minion-bold text-base uppercase tracking-wide text-accent">
              Genvägar
            </h2>
            <nav className="flex flex-col gap-3 text-base">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="minion-bold text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden items-center justify-center sm:flex">
            <p className="minion-bold text-center text-xs uppercase tracking-[0.15em] text-foreground md:text-sm lg:text-base">
              Lignum habes?
            </p>
          </div>

          <div className="space-y-4 text-left sm:text-right">
            <h2 className="minion-bold text-base uppercase tracking-wide text-accent">
              Sociala medier
            </h2>
            <div className="flex flex-col gap-3 text-base">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="minion-bold text-foreground transition-colors hover:text-accent"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto flex max-w-5xl items-center justify-start gap-5 border-t border-foreground/30 px-4 py-4">
          <a href="https://dick.fredriketsare.se" target="_blank" rel="noreferrer">
            <Image
              src="/logos/logs.jpg"
              alt="DICK logo"
              width={100}
              height={100}
              className="h-12 w-12 object-contain"
            />
          </a>

          <a href="https://disk.su.se" target="_blank" rel="noreferrer">
            <Image
              src="/logos/disk.png"
              alt="DISK logo"
              width={120}
              height={120}
              className="h-12 w-auto object-contain"
            />
          </a>

          <Image
            src="/logos/SK.svg"
            alt="SK logo"
            width={120}
            height={120}
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
