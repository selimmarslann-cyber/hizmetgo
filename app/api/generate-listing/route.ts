import { NextRequest, NextResponse } from "next/server";
import { askOpenAI } from "@/lib/ai/openai";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const { details } = await req.json();

    if (!details) {
      return NextResponse.json({ error: "Details gerekli" }, { status: 400 });
    }

    // Eğer conversation history varsa, onu kullan
    let prompt = "";
    if (details.conversation) {
      prompt = `
Aşağıdaki sohbet geçmişine göre profesyonel bir HizmetGo ilanı oluştur.

Sohbet Geçmişi:
${details.conversation}

Metni müşteri ağzından yaz. Sohbet geçmişindeki tüm bilgileri kullanarak kapsamlı ve detaylı bir ilan metni oluştur.

Üst düzey Türkçe, akıcı, açıklayıcı. İlan metni en az 100 kelime olsun.
`;
    } else {
      prompt = `
Aşağıdaki bilgilere göre profesyonel bir HizmetGo ilanı oluştur:

${JSON.stringify(details, null, 2)}

Metni müşteri ağzından yaz.

Üst düzey Türkçe, akıcı, açıklayıcı.
`;
    }

    console.log("📝 İlan metni oluşturuluyor...", {
      promptLength: prompt.length,
    });

    // İlan oluşturma için system prompt gerekli
    const listing = await askOpenAI(prompt, [], false);

    if (!listing || listing.trim().length < 10) {
      console.error("❌ İlan metni çok kısa veya boş:", listing);
      return NextResponse.json(
        {
          error: "İlan metni oluşturulamadı veya çok kısa",
          details: "AI'dan gelen yanıt yetersiz",
        },
        { status: 500 },
      );
    }

    console.log("✅ İlan metni oluşturuldu, uzunluk:", listing.length);

    return NextResponse.json({ listing, listingText: listing });
  } catch (err: any) {
    console.error("❌ Generate listing error:", err);
    return NextResponse.json(
      {
        error: err.message || "İlan metni oluşturulamadı",
        details: err.toString(),
      },
      { status: 500 },
    );
  }
}
