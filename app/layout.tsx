import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query";
import { ToasterClient } from "@/components/ToasterClient";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Branda V2 — Branding Services Marketplace",
  description:
    "Digital, gifts, create, studio and print branding services for Nigeria, the US, the UK and Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ReactQueryProvider>
          <TooltipProvider>
            {children}
            <ToasterClient />
            <div id="modal-root" />
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
