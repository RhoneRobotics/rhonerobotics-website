import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ReactLenis } from "@/utils/lenis";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const plusjakartasans = Plus_Jakarta_Sans({
  variable: "--font-geist-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhone Robotics ",
  description: "Future of Tech and Innovation",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body
          className={`${geistSans.variable} ${plusjakartasans.variable} ${geistMono.variable} antialiased  w-full min-h-screen overflow-x-hidden`}
        >
          <Navbar />
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
