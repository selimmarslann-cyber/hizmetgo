/**
 * HizmetGo Mail Templates
 *
 * Tüm email şablonları burada toplanır
 */

// Tüm config .env'den alınır, build sırasında default değer kullan
// Runtime'da gerçek environment variable değeri kullanılacak
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://hizmetgo.app";
const APP_NAME = process.env.APP_NAME || "HizmetGo";

/**
 * Base email template wrapper
 */
function getBaseEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${APP_NAME}</title>
    </head>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f7;">
      <div style="background: linear-gradient(135deg, #FF6000 0%, #FF5500 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 2px; font-weight: 700;">HİZMETGO</h1>
      </div>
      <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        ${content}
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
          Bu otomatik bir e-postadır. Lütfen yanıtlamayın.<br>
          © ${new Date().getFullYear()} ${APP_NAME}. Tüm hakları saklıdır.
        </p>
      </div>
    </body>
    </html>
  `;
}

/**
 * 1. VERIFICATION CODE EMAIL
 */
export function buildVerificationCodeEmail(params: {
  customerName: string;
  code: string;
}): { subject: string; html: string } {
  const subject = `${APP_NAME} - Doğrulama Kodunuz`;

  const html = getBaseEmailTemplate(`
    <h2 style="color: #FF6000; margin-top: 0; font-size: 24px;">Doğrulama Kodunuz</h2>
    <p>Merhaba ${params.customerName},</p>
    <p>${APP_NAME} hesabınız için doğrulama kodunuz:</p>
    <div style="background: #f9f9f9; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; border: 2px dashed #FF6000;">
      <h1 style="color: #FF6000; font-size: 36px; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace; font-weight: 700;">${params.code}</h1>
    </div>
    <p style="color: #666; font-size: 14px;">Bu kod 5 dakika süreyle geçerlidir.</p>
    <p style="color: #666; font-size: 14px;">Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
  `);

  return { subject, html };
}

/**
 * 2. RESET PASSWORD EMAIL
 */
export function buildResetPasswordEmail(params: {
  customerName: string;
  resetLink: string;
}): { subject: string; html: string } {
  const subject = `${APP_NAME} - Şifre Sıfırlama`;

  const html = getBaseEmailTemplate(`
    <h2 style="color: #FF6000; margin-top: 0; font-size: 24px;">Şifre Sıfırlama</h2>
    <p>Merhaba ${params.customerName},</p>
    <p>${APP_NAME} hesabınız için şifre sıfırlama talebinde bulundunuz.</p>
    <p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${params.resetLink}" style="background: #FF6000; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Şifremi Sıfırla</a>
    </div>
    <p style="color: #666; font-size: 14px;">Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz. Link 1 saat süreyle geçerlidir.</p>
    <p style="color: #999; font-size: 12px;">Veya bu linki kopyalayıp tarayıcınıza yapıştırabilirsiniz:<br><a href="${params.resetLink}" style="color: #666; word-break: break-all;">${params.resetLink}</a></p>
  `);

  return { subject, html };
}

/**
 * 3. ORDER CREATED EMAIL
 */
export function buildOrderCreatedEmail(params: {
  customerName: string;
  orderId: string;
  totalAmount: number;
  currency?: string;
}): { subject: string; html: string } {
  const currency = params.currency || "TRY";
  const formattedAmount =
    currency === "TRY"
      ? `₺${params.totalAmount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `${params.totalAmount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;

  const subject = `${APP_NAME} - Siparişiniz Alındı (#${params.orderId.slice(0, 8)})`;

  const html = getBaseEmailTemplate(`
    <h2 style="color: #FF6000; margin-top: 0; font-size: 24px;">Siparişiniz Alındı</h2>
    <p>Merhaba ${params.customerName},</p>
    <p>Siparişiniz başarıyla oluşturuldu ve esnaf onayına gönderildi.</p>
    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;"><strong>Sipariş No:</strong> #${params.orderId.slice(0, 8)}</p>
      <p style="margin: 0 0 10px 0;"><strong>Tutar:</strong> ${formattedAmount}</p>
      <p style="margin: 0;"><strong>Durum:</strong> Onay Bekleniyor</p>
    </div>
    <p style="color: #666; font-size: 14px;">Esnaf siparişinizi onayladığında size bildirim göndereceğiz.</p>
  `);

  return { subject, html };
}

/**
 * 4. ORDER STATUS EMAIL
 */
export function buildOrderStatusEmail(params: {
  customerName: string;
  orderId: string;
  status: string;
  statusText: string;
}): { subject: string; html: string } {
  const subject = `${APP_NAME} - Sipariş Durumu Güncellendi (#${params.orderId.slice(0, 8)})`;

  const html = getBaseEmailTemplate(`
    <h2 style="color: #FF6000; margin-top: 0; font-size: 24px;">Sipariş Durumu Güncellendi</h2>
    <p>Merhaba ${params.customerName},</p>
    <p>Siparişinizin durumu güncellendi:</p>
    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;"><strong>Sipariş No:</strong> #${params.orderId.slice(0, 8)}</p>
      <p style="margin: 0;"><strong>Yeni Durum:</strong> ${params.statusText}</p>
    </div>
    <p style="color: #666; font-size: 14px;">Sipariş detaylarını görmek için hesabınıza giriş yapabilirsiniz.</p>
  `);

  return { subject, html };
}

/**
 * 5. PAYMENT RECEIVED EMAIL (YENİ)
 */
export function buildPaymentReceivedEmail(params: {
  customerName: string;
  orderId: string;
  amount: number;
  currency?: string;
  paymentMethod?: string;
}): { subject: string; html: string } {
  const currency = params.currency || "TRY";
  const formattedAmount =
    currency === "TRY"
      ? `₺${params.amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `${params.amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;

  const paymentMethod = params.paymentMethod || "PayTR";
  const orderIdShort = params.orderId.slice(0, 8);

  const subject = `${APP_NAME} ödemeniz alındı (#${orderIdShort})`;

  const html = getBaseEmailTemplate(`
    <h2 style="color: #FF6000; margin-top: 0; font-size: 24px;">Ödemeniz Başarıyla Alındı</h2>
    <p>Merhaba ${params.customerName},</p>
    <p>Ödemeniz başarıyla alındı. Siparişiniz işleme alınmıştır.</p>
    <div style="background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%); padding: 24px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6000;">
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;"><strong>Sipariş No:</strong></p>
      <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #333;">#${orderIdShort}</p>
      
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;"><strong>Ödenen Tutar:</strong></p>
      <p style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #FF6000;">${formattedAmount}</p>
      
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;"><strong>Ödeme Yöntemi:</strong></p>
      <p style="margin: 0; font-size: 16px; font-weight: 500; color: #333;">${paymentMethod}</p>
    </div>
    <p style="color: #666; font-size: 14px;">Siparişiniz hazırlandıkça size bilgi vereceğiz. Sipariş detaylarını hesabınızdan takip edebilirsiniz.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${APP_URL}/orders/${params.orderId}" style="background: #FF6000; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 15px;">Sipariş Detaylarını Gör</a>
    </div>
  `);

  return { subject, html };
}

/**
 * 6. DELIVERY SOON EMAIL (YENİ - Teslime 5 dakika kala)
 */
export function buildDeliverySoonEmail(params: {
  customerName: string;
  orderId: string;
  etaMinutes: number;
}): { subject: string; html: string } {
  const orderIdShort = params.orderId.slice(0, 8);
  const etaMinutes = params.etaMinutes || 5;

  const subject = `${APP_NAME} siparişiniz birazdan teslim edilecek (#${orderIdShort})`;

  const html = getBaseEmailTemplate(`
    <h2 style="color: #FF6000; margin-top: 0; font-size: 24px;">Siparişiniz Yola Çıktı! 🚚</h2>
    <p>Merhaba ${params.customerName},</p>
    <p>Siparişinizin teslimine yaklaşık <strong>${etaMinutes} dakika</strong> kaldı.</p>
    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6000;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;"><strong>Sipariş No:</strong></p>
      <p style="margin: 0; font-size: 18px; font-weight: 600; color: #333;">#${orderIdShort}</p>
    </div>
    <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #d32f2f; font-size: 14px; font-weight: 600;">⚠️ Güvenlik Notu</p>
      <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">Lütfen teslimatı sizin veya güvendiğiniz birinin aldığından emin olun. Teslimat sırasında sipariş numaranızı paylaşabilirsiniz.</p>
    </div>
    <p style="color: #666; font-size: 14px;">Teslimat konumunuza hazır olun. Sorunuz olursa esnaf ile iletişime geçebilirsiniz.</p>
  `);

  return { subject, html };
}

/**
 * 7. NEARBY JOB EMAIL (YENİ - Hizmet veren için yakın iş fırsatı)
 */
export function buildNearbyJobEmail(params: {
  providerName: string;
  jobId: string;
  distanceKm: number;
  category: string;
  neighborhood: string;
  jobLink?: string;
}): { subject: string; html: string } {
  const distanceKm = Math.round(params.distanceKm * 10) / 10; // 1 ondalık basamak
  const jobLink = params.jobLink || `${APP_URL}/jobs/${params.jobId}`;
  const jobIdShort = params.jobId.slice(0, 8);

  const subject = `Yakınınızda yeni bir ${APP_NAME} işi var (${distanceKm} km)`;

  const html = getBaseEmailTemplate(`
    <h2 style="color: #FF6000; margin-top: 0; font-size: 24px;">Yakınınızda Yeni Bir İş Fırsatı! 💼</h2>
    <p>Merhaba ${params.providerName},</p>
    <p>Konumunuza yaklaşık <strong>${distanceKm} km</strong> uzaklıkta yeni bir iş fırsatı var.</p>
    <div style="background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%); padding: 24px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6000;">
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;"><strong>İş No:</strong></p>
      <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #333;">#${jobIdShort}</p>
      
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;"><strong>Kategori:</strong></p>
      <p style="margin: 0 0 20px 0; font-size: 16px; font-weight: 500; color: #333;">${params.category}</p>
      
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;"><strong>Konum:</strong></p>
      <p style="margin: 0 0 20px 0; font-size: 16px; font-weight: 500; color: #333;">${params.neighborhood}</p>
      
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;"><strong>Mesafe:</strong></p>
      <p style="margin: 0; font-size: 16px; font-weight: 500; color: #FF6000;">📍 ${distanceKm} km</p>
    </div>
    <p style="color: #666; font-size: 14px;">İş detaylarını görmek ve teklif vermek için aşağıdaki butona tıklayın.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${jobLink}" style="background: #FF6000; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Fırsatı Gör</a>
    </div>
    <p style="color: #999; font-size: 12px; text-align: center;">Bu bildirimleri almak istemiyorsanız, hesap ayarlarınızdan bildirim tercihlerinizi değiştirebilirsiniz.</p>
  `);

  return { subject, html };
}
