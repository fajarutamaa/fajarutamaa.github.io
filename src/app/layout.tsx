import type { Metadata } from "next";

import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Provider } from "./provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Fajar Dwi Utomo - Software Engineer",
  description: "Software Engineer",
  openGraph: {
    type: "website",
    description: "Junior Software Engineer",
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
      <head>
        <script
          async
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3f30a149-5d18-433c-98a2-b940af1b5282"
        ></script>
        <meta name="google-site-verification" content="Pczx3WHw0VnNdssn6ulbWnQI91YIb0EgbwkHuggcgPE" />
      </head>
      <body
        className={`bg-background font-sans text-foreground antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {/* Antigravity-style gradient background */}
        <div className="gradient-bg">
          <div className="gradient-orb gradient-orb-1" />
          <div className="gradient-orb gradient-orb-2" />
        </div>

        <Toaster position="top-center" />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
