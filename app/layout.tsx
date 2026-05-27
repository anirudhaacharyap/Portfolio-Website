import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ANIRUDHA ACHARYA P // CREATIVE_SYSTEM",
  description:
    "Backend engineer & researcher building systems that scale and never fail. AI/ML, distributed architectures, and Carnatic music.",
  keywords: [
    "Anirudha Acharya",
    "Portfolio",
    "Software Engineer",
    "AI/ML",
    "Full Stack",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable} ${spaceMono.variable} ${instrumentSans.variable} dark`}
      style={{ scrollPaddingTop: "64px" }}
    >
      <body className="overflow-x-hidden bg-[#0B0B0C] text-[#e5e2e1] antialiased">
        {/* Grain noise overlay */}
        <div className="grain" aria-hidden="true" />

        {/* Global navigation */}
        <Navbar />

        {/* Scroll container */}
        <main className="mt-16 mb-10">
          {children}
        </main>

        {/* Status ticker footer */}
        <Footer />
      </body>
    </html>
  );
}
