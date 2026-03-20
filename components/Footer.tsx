'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { ADMIN_NAVIGATION_ITEMS, BASE_NAVIGATION_ITEMS, MEMBER_NAVIGATION_ITEMS } from './Navbar';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { serverLogout } from '@/app/logout/actions';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/studentkarendisk/' },
  { label: 'Facebook', href: 'https://www.facebook.com/diskstudentkar' },
  { label: 'Discord', href: 'https://discord.gg/q9JXFJjmQ4' },
];

export default function Footer() {
  const [lignumClicks, setLignumClicks] = useState(0);
  const { user, loading, logout } = useAuth();
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleLignumClick = () => {
    setLignumClicks((prev) => (prev + 1) % 3);
  };

  const navigationItems =
    user?.role === 'admin'
      ? ADMIN_NAVIGATION_ITEMS
      : user
        ? MEMBER_NAVIGATION_ITEMS
        : BASE_NAVIGATION_ITEMS;

  return (
    <footer className="w-full bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10">
        <div className="grid w-full gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start md:justify-center">
          <div className="space-y-4">
            <h2 className="lettering text-base text-royal-gold-400">Genvägar</h2>
            <nav className="flex flex-col gap-3 text-base">
              {navigationItems.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="lettering text-foreground transition-colors hover:text-royal-gold-400"
                >
                  {item.label}
                </Link>
              ))}

              {!loading && (
                <>
                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        startTransition(async () => {
                          await serverLogout();
                          logout();
                          router.push('/');
                        });
                      }}
                      className="lettering text-left text-foreground transition-colors hover:text-royal-gold-400"
                    >
                      Logga ut
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="lettering text-foreground transition-colors hover:text-royal-gold-400"
                    >
                      Logga in
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          <div className="hidden flex-col justify-center gap-1 sm:flex">
            <Link href={lignumClicks === 2 ? '/admin' : '#'} onClick={handleLignumClick}>
              <p className="lettering text-center text-xs text-royal-gold-400 md:text-sm lg:text-base">
                Lignum habes?
              </p>
            </Link>
          </div>

          <div className="space-y-4 text-left sm:text-right">
            <h2 className="lettering text-base text-royal-gold-400">Kontakt</h2>
            <div className="flex flex-col gap-3 text-base">
              <a href="mailto:dick@disk.su.se" className="lettering hover:underline">
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
              <Link
                className="lettering text-foreground transition-colors hover:text-royal-gold-400"
                href="/vilkor"
              >
                Vilkor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 border-t border-foreground/30 px-4 py-4 md:flex-row">
          <div className="flex items-center gap-5">
            <a href="https://dick.fredriketsare.se" target="_blank" rel="noreferrer">
              <Image
                src="/logos/logs.jpg"
                alt="DICK logo"
                width={120}
                height={120}
                className="h-16 w-12 object-contain"
              />
            </a>

            <a href="https://disk.su.se" target="_blank" rel="noreferrer">
              <Image
                src="/logos/disk.png"
                alt="DISK logo"
                width={120}
                height={120}
                className="h-16 w-auto object-contain"
              />
            </a>

            <Image
              src="/logos/SK.svg"
              alt="SK logo"
              width={120}
              height={120}
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-1 text-xs md:items-end md:text-sm">
            <a
              href="https://github.com/fetsare/dick.disk.su.se"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 lettering text-foreground transition-colors hover:text-royal-gold-400"
            >
              <span>GitHub</span>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Catan"
              target="_blank"
              rel="noreferrer"
              className="lettering text-foreground transition-colors hover:text-royal-gold-400"
            >
              Catan på Wikipedia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
