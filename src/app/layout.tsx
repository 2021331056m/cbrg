import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageScrollTransition from "@/components/layout/PageScrollTransition";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { withBasePath } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: withBasePath("/favicon.png"),
    apple: withBasePath("/apple-icon.png"),
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: withBasePath("/images/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning >
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
        <PageScrollTransition />
      </body>
    </html>
  );
}
