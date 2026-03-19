import type { Metadata } from "next";
import {
  minionProRegular,
  minionProItalic,
  minionProBold,
  minionProBoldItalic,
} from "./fonts";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", minionProRegular.variable, minionProItalic.variable, minionProBold.variable, minionProBoldItalic.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen w-screen">{children}</body>
    </html>
  );
}
