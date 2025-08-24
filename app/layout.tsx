import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TokenRefresh from "@/components/tokenRefresh";
import { Providers } from "./providers";
import NavBar from "@/components/layouts/navbar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Script from "next/script";
import { UserContextProvider } from "@/components/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care Connect",
  description: "Connecting Hearts, Empowering Communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContextProvider>
          <TokenRefresh />
          <Providers>
            <NextThemesProvider attribute="class"
              defaultTheme="light"
              enableSystem={true}
              disableTransitionOnChange>
              <NavBar />
              {children}
            </NextThemesProvider>
          </Providers>
        </UserContextProvider>
      </body>
    </html>
  );
}
