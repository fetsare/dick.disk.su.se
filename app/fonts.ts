import localFont from "next/font/local";

export const minionProRegular = localFont({
  src: "../public/fonts/MinionPro-Regular.otf",
  variable: "--font-minion-regular",
  weight: "400",
  display: "swap",
});

export const minionProItalic = localFont({
  src: "../public/fonts/MinionPro-It.otf",
  variable: "--font-minion-italic",
  weight: "400",
  style: "italic",
  display: "swap",
});

export const minionProBold = localFont({
  src: "../public/fonts/MinionPro-Bold.otf",
  variable: "--font-minion-bold",
  weight: "700",
  display: "swap",
});

export const minionProBoldItalic = localFont({
  src: "../public/fonts/MinionPro-BoldIt.otf",
  variable: "--font-minion-bold-italic",
  weight: "700",
  style: "italic",
  display: "swap",
});