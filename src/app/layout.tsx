import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-host-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#E4F86E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://solaris-energy.com"),
  title: "Solaris Energy — Solar energy that moves the world forward",
  description:
    "Powering homes and businesses with clean, renewable solar solutions. Reduce your carbon footprint and energy costs today.",
  keywords: [
    "Solaris Energy",
    "solar panels",
    "clean energy",
    "renewable energy",
    "residential solar installation",
    "commercial solar installation",
    "smart solar solutions",
  ],
  authors: [{ name: "Solaris Energy" }],
  creator: "Solaris Energy",
  publisher: "Solaris Energy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://solaris-energy.com",
    title: "Solaris Energy — Solar energy that moves the world forward",
    description:
      "Powering homes and businesses with clean, renewable solar solutions. Reduce your carbon footprint and energy costs today.",
    siteName: "Solaris Energy",
    images: [
      {
        url: "/images/hero-villa.png",
        width: 1200,
        height: 630,
        alt: "Solaris Energy residential installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solaris Energy — Solar energy that moves the world forward",
    description:
      "Powering homes and businesses with clean, renewable solar solutions. Reduce your carbon footprint and energy costs today.",
    images: ["/images/hero-villa.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

import { ScrollManager } from "@/components/ui/ScrollManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Solaris Energy",
    image: "https://solaris-energy.com/images/hero-villa.png",
    "@id": "https://solaris-energy.com",
    url: "https://solaris-energy.com",
    telephone: "+19947171255",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4020 University Dr",
      addressLocality: "Fairfax",
      addressRegion: "VA",
      addressCountry: "USA",
    },
    description:
      "Powering homes and businesses with clean, renewable solar solutions. Reduce your carbon footprint and energy costs today.",
  };

  return (
    <html lang="en" className={`${hostGrotesk.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[family-name:var(--font-host-grotesk)] text-[#111111] bg-white antialiased selection:bg-[#E4F86E] selection:text-[#111111] overflow-x-hidden">
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
