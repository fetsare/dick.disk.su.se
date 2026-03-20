import type { Metadata } from "next";
import {
  minionProRegular,
  minionProItalic,
  minionProBold,
  minionProBoldItalic,
} from "./fonts";
import Navbar from "@/components/Navbar";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DICK - DISKs Interna Catan Klub",
  description: "DISKs Interna Catan Klub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        minionProRegular.variable,
        minionProItalic.variable,
        minionProBold.variable,
        minionProBoldItalic.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-screen w-screen bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
