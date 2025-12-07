import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { setOtp } from "@/lib/auth/otpStore";

const sendOtpSchema = z.object({
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = sendOtpSchema.parse(body);

    // 6 haneli OTP kodu oluştur
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP'yi sakla (production'da Redis kullanılmalı)
    setOtp(validated.phone, code, 5 * 60 * 1000); // 5 dakika

    // Production'da burada SMS servisi çağrılacak (Twilio, AWS SNS, vb.)
    console.log(`[MOCK] OTP sent to ${validated.phone}: ${code}`);

    // Simüle edilmiş gecikme
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Kod gönderildi",
      // Development için kod döndürülüyor, production'da kaldırılmalı
      ...(process.env.NODE_ENV === "development" && { mockCode: code }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Kod gönderilemedi" }, { status: 500 });
  }
}
