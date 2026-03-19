import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const minionProItalic = localFont({
  src: "../public/fonts/Minion-Pro-Italic.ttf",
  variable: "--font-minion-pro-italic",
});

const minionProBold = localFont({
  src: "../public/fonts/Minion-Pro-Bold.ttf",
  variable: "--font-minion-pro-bold",
});

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
      className={`${minionProBold.variable} ${minionProItalic.variable} h-full antialiased`}
    >
      <body className="min-h-screen w-screen">{children}</body>
    </html>
  );
}
