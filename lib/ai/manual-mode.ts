/**
 * Manual Mode
 * Token limiti dolduğunda veya AI kapandığında manuel ilan oluşturma
 */

export interface ManualListingData {
  description: string;
  date: string | "acil" | "esnek";
  priority: "acil" | "normal" | "esnek";
  address: string;
  price_range: string;
  category?: string;
}

/**
 * Manuel mod mesajı
 */
export const MANUAL_MODE_MESSAGE = `Bu işlem çok uzadı.

Lütfen ilanınızı kendi cümlelerinizle yazınız:

- Açıklama
- Uygulama tarihi
- Tahmini fiyat aralığı

Hazır olduğunuzda "İlanı yayınla" butonuna basın.`;

/**
 * İlan başarı mesajı (local)
 */
export const SUCCESS_MESSAGE = `İlanınız başarıyla oluşturuldu! 🎉

Uygulamamız; 
• Anlık işler ile ek gelir fırsatı,
• Harita üzerinden bölgenizdeki esnafları görüntüleme,
• Referans sistemi ile ömür boyu gelir fırsatı sunar.

Mini tur'u incelemeyi unutmayın!

Şimdi sizi İlanlarım bölümüne yönlendiriyorum.

Lütfen "Tamam" yazarak onaylayınız.`;

/**
 * Manuel moda geçme nedeni
 */
export enum ManualModeReason {
  TOKEN_LIMIT = "TOKEN_LIMIT",
  USER_REQUEST = "USER_REQUEST",
  SYSTEM_ERROR = "SYSTEM_ERROR",
}
