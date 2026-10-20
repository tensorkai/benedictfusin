import type { Metadata } from "next";
import { Geist_Mono, Gloock, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Gloock({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benedict Fusin (tensorkai) — Code, Circuits, Canvas",
  description:
    "Portfolio of Benedict Fusin (tensorkai). Turning what if into it works across AI & Edge ML, embedded hardware & IoT, and visual computing & art. PUP Sta. Mesa · Manila & Hangzhou.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
