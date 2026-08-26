import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted from ./fonts — no build-time call to Google. Both are variable
// faces, so one file covers the whole 100-900 weight range. Fonts, theme and
// the html/body shell are all each course segment inherits from here; course
// chrome (TopBar, providers, footer) lives in the per-course layouts.
const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["Segoe UI", "-apple-system", "Arial", "sans-serif"],
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ["Cascadia Code", "Consolas", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Science Academy — Learn by Building",
  description:
    "Hands-on interactive courses: Spark Academy (electrical engineering from the electron up) and Catalyst Academy (chemistry from the atom up, with an Eselsbrücke for every element). Theory, live simulations and quizzes in every lesson.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
