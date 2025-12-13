import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Popüler aramalar (şimdilik statik, ileride database'den çekilebilir)
const popularSearches = [
  "Siparişimi nasıl iptal ederim?",
  "İade nasıl yapılır?",
  "Şifremi unuttum",
  "Ödeme sorunu",
  "Hesabımı nasıl silerim?",
  "Sipariş takibi",
  "Referans programı",
  "Para çekme",
  "Esnaf kaydı",
  "Hesap güvenliği",
];

export async function GET(req: NextRequest) {
  try {
    // İleride database'den gerçek popüler aramaları çekebiliriz
    // Şimdilik statik liste döndürüyoruz
    return NextResponse.json({
      searches: popularSearches,
    });
  } catch (error: any) {
    console.error("Popular searches error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch popular searches",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

