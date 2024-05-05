import type { Metadata } from "next";

import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

export const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});

export const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Concrete Core",
  description:
    "Transform your construction projects with our cutting-edge web application designed for evaluating and testing concrete quality and strength.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-base font-medium antialiased",
          ibmSans.className,
          ibmMono.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
