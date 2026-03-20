"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAVIGATION_ITEMS } from "./Navbar";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/studentkarendisk/" },
  { label: "Facebook", href: "https://www.facebook.com/diskstudentkar" },
  { label: "Discord", href: "https://discord.gg/q9JXFJjmQ4" },
];

export default function Footer() {
  const [lignumClicks, setLignumClicks] = useState(0);

  const handleLignumClick = () => {
    setLignumClicks((prev) => (prev + 1) % 3);
  };

  return (
    <footer className="w-full bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10">
        <div className="grid w-full gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start md:justify-center">
          <div className="space-y-4">
            <h2 className="lettering text-base text-royal-gold-400">
              Genvägar
            </h2>
            <nav className="flex flex-col gap-3 text-base">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="lettering text-foreground transition-colors hover:text-royal-gold-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden flex-col justify-center gap-1 sm:flex">
            <Link href={lignumClicks === 2 ? "/admin" : "#"} onClick={handleLignumClick}>
              <p className="lettering text-center text-xs text-royal-gold-400 md:text-sm lg:text-base">
                Lignum habes?
              </p>
            </Link>
          </div>

          <div className="space-y-4 text-left sm:text-right">
            <h2 className="lettering text-base text-royal-gold-400">
              Sociala medier
            </h2>
            <div className="flex flex-col gap-3 text-base">
              <a
                href="mailto:dick@disk.su.se"
                className="lettering text-xs hover:underline md:text-sm"
              >
                dick@disk.su.se
              </a>
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="lettering text-foreground transition-colors hover:text-royal-gold-400"
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
          <a
            href="https://dick.fredriketsare.se"
            target="_blank"
            rel="noreferrer"
          >
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
