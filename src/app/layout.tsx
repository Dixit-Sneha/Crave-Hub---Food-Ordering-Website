import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "CraveBite | Premium Food Delivery",
  description: "Cravings delivered fast! Order from your favorite premium restaurants with CraveBite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
