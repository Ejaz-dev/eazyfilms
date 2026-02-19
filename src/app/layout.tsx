import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: {
    default: "eazyfilms | Visual Stories",
    template: "%s | eazyfilms",
  },
  description: "Documenting the quiet poetry of street life and human connection. Photography and film by eazyfilms.",
  keywords: ["photography", "film", "street photography", "visual stories", "eazyfilms"],
  authors: [{ name: "eazyfilms" }],
  creator: "eazyfilms",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eazyfilms.com",
    siteName: "eazyfilms",
    title: "eazyfilms | Visual Stories",
    description: "Documenting the quiet poetry of street life and human connection.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "eazyfilms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eazyfilms | Visual Stories",
    description: "Documenting the quiet poetry of street life and human connection.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <ScrollProgress />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}