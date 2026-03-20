import type { Metadata } from "next";
import {
  minionProRegular,
  minionProItalic,
  minionProBold,
  minionProBoldItalic,
} from "./fonts";
import Navbar from "@/components/Navbar";

import "./globals.css";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth-context";
import { defaultMetadata } from "./metadata";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`
  ${minionProRegular.variable}
  ${minionProItalic.variable}
  ${minionProBold.variable}
  ${minionProBoldItalic.variable}
  font-minion-regular
  `}
    >
      <body>
        <AuthProvider>
          <div className="flex min-h-screen flex-col w-screen text-foreground">
            <Navbar />
            <main className="flex-1 relative w-full overflow-hidden">
              <div className="pointer-events-none fixed inset-0 -z-10">
                <Image
                  src="/catan.jpg"
                  alt="Catan landscape"
                  fill
                  priority
                  className="object-cover brightness-75 blur-xs"
                />
              </div>
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
