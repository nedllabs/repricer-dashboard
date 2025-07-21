import type React from "react";
import type { Metadata } from "next";
import { Open_Sans, Comfortaa } from "next/font/google";
import "./globals.css";
import { HeaderNavigation } from "@/components/header-navigation";
import "mapbox-gl/dist/mapbox-gl.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  weight: ["300", "400", "500", "600", "700", "800"],
});
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nedl Labs :: Analytics Dashboard",
  description:
    "Healthcare analytics and claims processing dashboard for comprehensive data insights and reporting",
  keywords: [
    "healthcare analytics",
    "claims processing",
    "medical data",
    "dashboard",
    "NEDL",
  ],
  authors: [{ name: "NEDL Analytics Team" }],
  creator: "NEDL Analytics",
  publisher: "NEDL Analytics",
  openGraph: {
    title: "NEDL Analytics Dashboard",
    description:
      "Healthcare analytics and claims processing dashboard for comprehensive data insights and reporting",
    url: "https://nedl-analytics.vercel.app",
    siteName: "NEDL Analytics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEDL Analytics Dashboard - Claims Process Summary",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEDL Analytics Dashboard",
    description:
      "Healthcare analytics and claims processing dashboard for comprehensive data insights and reporting",
    images: ["/og-image.png"],
    creator: "@nedlanalytics",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body
        className={`${openSans.variable} ${comfortaa.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
          <HeaderNavigation />
          {children}
        </div>
      </body>
    </html>
  );
}
