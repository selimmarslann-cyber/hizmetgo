import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = defaultMetadata;

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
