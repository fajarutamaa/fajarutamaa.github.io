import type { Metadata } from "next";

import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Provider } from "./provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Fahrezi Adha - Software Engineer",
  description: "Software Engineer",
  openGraph: {
    type: "website",
    description: "Frontend Engineer",
    title: "Fajar Dwi Utomo",
    siteName: "Fajar Dwi Utomo",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-background font-sans text-foreground antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Toaster position="top-center"/>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
