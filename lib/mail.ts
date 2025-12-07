/**
 * Email Service - Zoho SMTP Integration
 *
 * Reusable email sending service using nodemailer
 */

import nodemailer from "nodemailer";

// Zoho SMTP Configuration
// Transporter'ı lazy initialize et (sadece kullanıldığında oluştur)
export function getTransporter() {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error(
      "Email configuration is missing. Please set MAIL_USER and MAIL_PASS environment variables.",
    );
  }

  // Tüm mail config .env'den alınmalı, default değer yok
  if (!process.env.MAIL_HOST) {
    throw new Error(
      "MAIL_HOST environment variable is required. Please set it in .env file.",
    );
  }
  if (!process.env.MAIL_PORT) {
    throw new Error(
      "MAIL_PORT environment variable is required. Please set it in .env file.",
    );
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    // Connection timeout
    connectionTimeout: 10000, // 10 seconds
    // Greeting timeout
    greetingTimeout: 10000, // 10 seconds
    // Socket timeout
    socketTimeout: 10000, // 10 seconds
  });
}

/**
 * Send email
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - Email HTML content
 * @returns Promise with message info
 */
export async function sendMail(
  to: string,
  subject: string,
  html: string,
): Promise<nodemailer.SentMessageInfo> {
  // Config kontrolü
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    const error = new Error(
      "Email configuration is missing. Please set MAIL_USER and MAIL_PASS environment variables.",
    );
    console.error("Email config error:", {
      MAIL_USER: process.env.MAIL_USER ? "SET" : "NOT_SET",
      MAIL_PASS: process.env.MAIL_PASS ? "SET" : "NOT_SET",
      MAIL_HOST: process.env.MAIL_HOST ? "SET" : "NOT_SET",
      MAIL_PORT: process.env.MAIL_PORT ? "SET" : "NOT_SET",
      MAIL_SECURE: process.env.MAIL_SECURE ? "SET" : "NOT_SET",
      MAIL_FROM: process.env.MAIL_FROM ? "SET" : "NOT_SET",
    });
    throw error;
  }

  // Transporter'ı oluştur
  const transporter = getTransporter();

  // MAIL_FROM zorunlu, yoksa MAIL_USER kullan
  const fromEmail = process.env.MAIL_FROM || process.env.MAIL_USER;
  if (!fromEmail) {
    throw new Error(
      "MAIL_FROM or MAIL_USER environment variable is required. Please set it in .env file.",
    );
  }

  const mailOptions = {
    from: fromEmail,
    to,
    subject,
    html,
  };

  try {
    // SMTP bağlantısını test et
    await transporter.verify();

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", {
      messageId: info.messageId,
      to,
      subject,
      accepted: info.accepted,
      rejected: info.rejected,
    });
    return info;
  } catch (error: any) {
    console.error("❌ Email sending error:", {
      to,
      subject,
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    // Daha açıklayıcı hata mesajı
    let errorMessage = "E-posta gönderilemedi";
    if (error.code === "EAUTH") {
      errorMessage =
        "E-posta kimlik doğrulama hatası. MAIL_USER ve MAIL_PASS kontrol edin.";
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "SMTP sunucusuna bağlanılamadı. MAIL_HOST ve MAIL_PORT kontrol edin.";
    } else if (error.code === "ETIMEDOUT") {
      errorMessage = "E-posta gönderme zaman aşımına uğradı.";
    } else if (error.response) {
      errorMessage = `SMTP hatası: ${error.response}`;
    }

    const enhancedError = new Error(errorMessage);
    (enhancedError as any).originalError = error;
    throw enhancedError;
  }
}

/**
 * Send OTP email
 * @param to - Recipient email address
 * @param code - 6-digit OTP code
 * @returns Promise with message info
 */
export async function sendOtpEmail(
  to: string,
  code: string,
): Promise<nodemailer.SentMessageInfo> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mahallem - Doğrulama Kodu</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #FF6000 0%, #FF5500 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 2px;">MAHALLEM</h1>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
        <h2 style="color: #FF6000; margin-top: 0;">Doğrulama Kodunuz</h2>
        <p>Merhaba,</p>
        <p>Mahallem hesabınız için doğrulama kodunuz:</p>
        <div style="background: white; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; border: 2px dashed #FF6000;">
          <h1 style="color: #FF6000; font-size: 36px; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">${code}</h1>
        </div>
        <p style="color: #666; font-size: 14px;">Bu kod 5 dakika süreyle geçerlidir.</p>
        <p style="color: #666; font-size: 14px;">Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
          Bu otomatik bir e-postadır. Lütfen yanıtlamayın.
        </p>
      </div>
    </body>
    </html>
  `;

  return sendMail(to, "Mahallem - Doğrulama Kodu", html);
}
