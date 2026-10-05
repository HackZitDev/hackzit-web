import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import RippleEffect from "./components/RippleEffect";
import { LanguageProvider } from "./contexts/LanguageContext";
import HtmlLanguageWrapper from "./components/HtmlLanguageWrapper";
import { Analytics } from "@vercel/analytics/react";

// Initialize the IBM Plex Sans Thai font
const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "700"],
  subsets: ["latin", "thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HackZit - Software Development Company",
  description:
    "Full-stack software development company specializing in custom applications, mobile solutions, enterprise software, and cutting-edge technologies.",
  keywords:
    "software development, web development, mobile apps, custom software, technology solutions, HackZit",
  authors: [{ name: "HackZit Team" }],
  creator: "HackZit",
  publisher: "HackZit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hackzit.dev"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "es-ES": "/es",
      "th-TH": "/th",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://hackzit.dev/",
    siteName: "HackZit",
    title: "HackZit - Custom Software Development Solutions",
    description:
      "Full-stack software development company specializing in custom applications, mobile solutions, enterprise software, and cutting-edge technologies.",
    images: [
      {
        url: "https://hackzit.dev/HACKZIT_LOGO/3x/GroupLogo.png",
        width: 1200,
        height: 630,
        alt: "HackZit Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackZit - Custom Software Development Solutions",
    description:
      "Full-stack software development company specializing in custom applications, mobile solutions, enterprise software, and cutting-edge technologies.",
    images: ["https://hackzit.dev/HACKZIT_LOGO/3x/GroupLogo.png"],
    creator: "@hackzit",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <HtmlLanguageWrapper>
        <body className={`${ibmPlexSansThai.className} antialiased`}>
          <CustomCursor />
          <RippleEffect />
          {children}
          <Analytics />
        </body>
      </HtmlLanguageWrapper>
    </LanguageProvider>
  );
}
