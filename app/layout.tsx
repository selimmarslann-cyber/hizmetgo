import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://mahallem-rrz7.vercel.app",
  ),
  title: "Hizmetgo - Esnaf/Hizmet Süper Uygulaması",
  description:
    "Mahalle esnafı ve hizmet sağlayıcıları ile müşterileri buluşturan platform",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
