import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voomcabs.com"),
  title: "VOOM Cabs | Real-Time Fare Comparison",
  description:
    "Join the VOOM Cabs waitlist to get early access to real-time fare and ETA comparison across multiple cab apps in one place.",
  openGraph: {
    title: "VOOM Cabs",
    description:
      "Compare real-time cab prices and ETAs across apps. Join the waitlist.",
    url: "https://voomcabs.com",
    type: "website",
    images: [{ url: "/brand/logo-full.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VOOM Cabs",
    description:
      "Compare cab fares in real time across multiple ride-hailing apps.",
    images: ["/brand/logo-full.png"],
  },
  icons: {
    icon: "/brand/favicon-steering-yellow.png",
    shortcut: "/favicon.ico",
    apple: "/brand/favicon-steering-yellow.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
