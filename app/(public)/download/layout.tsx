import type { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetgo Mobil Uygulama - İndir | Mahalle Esnafı ve Hizmet Platformu",
  description:
    "Hizmetgo mobil uygulamasını indir. Temizlikten tamire, marketten çilingire kadar tüm esnaflar tek app'te. Google Play ve App Store'dan ücretsiz indir.",
  keywords: [
    "hizmetgo",
    "mobil uygulama",
    "esnaf",
    "hizmet",
    "temizlik",
    "tamir",
    "market",
    "android",
    "ios",
    "app store",
    "google play",
  ],
  openGraph: {
    title: "Hizmetgo Mobil Uygulama - İndir",
    description:
      "Mahallendeki her iş için tek uygulama. Ücretsiz indir, hemen başla.",
    type: "website",
    url: "https://hizmetgo.app/download",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetgo Mobil Uygulama - İndir",
    description:
      "Mahallendeki her iş için tek uygulama. Ücretsiz indir, hemen başla.",
  },
  alternates: {
    canonical: "https://hizmetgo.app/download",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
