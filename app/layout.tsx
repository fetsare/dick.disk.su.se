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
        <div className="flex min-h-screen flex-col w-screen text-foreground">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
