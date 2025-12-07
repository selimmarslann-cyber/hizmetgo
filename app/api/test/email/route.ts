/**
 * Email Test Endpoint
 *
 * POST /api/test/email - E-posta gönderme sistemini test et
 */

import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { sendOtpEmail } from "@/lib/mail";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, testType } = body;

    if (!to) {
      return NextResponse.json(
        { error: "to (e-posta adresi) parametresi gerekli" },
        { status: 400 },
      );
    }

    // Environment variables kontrolü
    const mailConfig = {
      host: process.env.MAIL_HOST || "smtp.zoho.com",
      port: process.env.MAIL_PORT || "587",
      secure: process.env.MAIL_SECURE === "true",
      user: process.env.MAIL_USER || "NOT_SET",
      pass: process.env.MAIL_PASS ? "***SET***" : "NOT_SET",
      from: process.env.MAIL_FROM || process.env.MAIL_USER || "NOT_SET",
    };

    // Config kontrolü
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      return NextResponse.json(
        {
          success: false,
          error: "E-posta yapılandırması eksik",
          details: {
            message:
              "MAIL_USER ve MAIL_PASS environment variable'ları set edilmemiş",
            config: mailConfig,
          },
        },
        { status: 500 },
      );
    }

    if (testType === "otp") {
      // OTP e-posta testi
      const testCode = "123456";
      try {
        await sendOtpEmail(to, testCode);
        return NextResponse.json({
          success: true,
          message: "OTP e-postası başarıyla gönderildi!",
          test: {
            to,
            code: testCode,
            config: {
              ...mailConfig,
              pass: "***HIDDEN***",
            },
          },
          timestamp: new Date().toISOString(),
        });
      } catch (error: any) {
        console.error("OTP email error:", error);
        return NextResponse.json(
          {
            success: false,
            error: "OTP e-postası gönderilemedi",
            details: error.message || "Bilinmeyen hata",
            config: {
              ...mailConfig,
              pass: "***HIDDEN***",
            },
          },
          { status: 500 },
        );
      }
    } else {
      // Basit e-posta testi
      const testSubject = "Hizmetgo - Test E-postası";
      const testHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FF6000 0%, #FF5500 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Hizmetgo</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #FF6000; margin-top: 0;">Test E-postası ✅</h2>
            <p>Merhaba,</p>
            <p>Bu bir test e-postasıdır. E-posta gönderme sistemi çalışıyor!</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Gönderim Zamanı: ${new Date().toLocaleString("tr-TR")}
            </p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              Bu otomatik bir e-postadır. Lütfen yanıtlamayın.
            </p>
          </div>
        </body>
        </html>
      `;

      try {
        const info = await sendMail(to, testSubject, testHtml);
        return NextResponse.json({
          success: true,
          message: "Test e-postası başarıyla gönderildi!",
          test: {
            to,
            subject: testSubject,
            messageId: info.messageId,
            config: {
              ...mailConfig,
              pass: "***HIDDEN***",
            },
          },
          timestamp: new Date().toISOString(),
        });
      } catch (error: any) {
        console.error("Email sending error:", error);
        return NextResponse.json(
          {
            success: false,
            error: "E-posta gönderilemedi",
            details: error.message || "Bilinmeyen hata",
            stack:
              process.env.NODE_ENV === "development" ? error.stack : undefined,
            config: {
              ...mailConfig,
              pass: "***HIDDEN***",
            },
          },
          { status: 500 },
        );
      }
    }
  } catch (error: any) {
    console.error("Email test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "E-posta testi başarısız",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/test/email - E-posta yapılandırmasını kontrol et
 */
export async function GET() {
  const mailConfig = {
    host: process.env.MAIL_HOST || "smtp.zoho.com",
    port: process.env.MAIL_PORT || "587",
    secure: process.env.MAIL_SECURE === "true",
    user: process.env.MAIL_USER || "NOT_SET",
    pass: process.env.MAIL_PASS ? "***SET***" : "NOT_SET",
    from: process.env.MAIL_FROM || process.env.MAIL_USER || "NOT_SET",
  };

  const isConfigured = !!(
    process.env.MAIL_USER &&
    process.env.MAIL_PASS &&
    process.env.MAIL_HOST
  );

  return NextResponse.json({
    configured: isConfigured,
    config: {
      ...mailConfig,
      pass: "***HIDDEN***",
    },
    message: isConfigured
      ? "E-posta yapılandırması tamamlanmış"
      : "E-posta yapılandırması eksik. MAIL_USER, MAIL_PASS ve MAIL_HOST environment variable'larını set edin.",
  });
}
