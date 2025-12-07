import { NextRequest, NextResponse } from "next/server";
import { runAutoOfflineChecks } from "@/lib/services/autoOfflineService";

/**
 * Maintenance endpoint - AUTO_OFFLINE kontrollerini çalıştırır
 *
 * TODO: Bu endpoint ileride gerçek cron job / scheduler ile periyodik tetiklenecek
 * Şimdilik manuel olarak veya development ortamında test için kullanılabilir
 *
 * Production'da bu endpoint'i korumalı hale getirmek gerekir (API key veya admin auth)
 */

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    // TODO: Production'da auth kontrolü ekle
    // const authHeader = request.headers.get('authorization')
    // if (authHeader !== `Bearer ${process.env.MAINTENANCE_API_KEY}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const result = await runAutoOfflineChecks();

    return NextResponse.json({
      success: true,
      message: "AUTO_OFFLINE kontrolleri tamamlandı",
      result,
    });
  } catch (error: any) {
    console.error("Maintenance error:", error);
    return NextResponse.json(
      { error: error.message || "Maintenance işlemi başarısız" },
      { status: 500 },
    );
  }
}

/**
 * GET endpoint - durum kontrolü için (sadece admin veya CRON_SECRET ile)
 */
export async function GET(request: NextRequest) {
  // CRON_SECRET kontrolü
  const cronSecret =
    request.headers.get("x-cron-secret") ||
    request.headers.get("authorization")?.replace("Bearer ", "");
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  if (cronSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Maintenance endpoint aktif",
    note: "POST isteği göndererek AUTO_OFFLINE kontrollerini çalıştırabilirsiniz",
  });
}
