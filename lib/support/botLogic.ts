/**
 * Support Bot Logic
 * Bot sorunları çözmeye çalışır, çözülemezse admin'e aktarır
 */

interface BotResponse {
  content: string;
  resolved?: boolean;
  escalated?: boolean;
  category?: string;
  priority?: number;
}

interface ProcessMessageParams {
  ticket: any;
  userMessage: string;
  userId: string | null;
}

export async function processBotMessage({
  ticket,
  userMessage,
  userId,
}: ProcessMessageParams): Promise<BotResponse | null> {
  const message = userMessage.toLowerCase().trim();

  // Anahtar kelime bazlı eşleştirme
  const responses: Array<{
    keywords: string[];
    response: string;
    resolved?: boolean;
    category?: string;
  }> = [
    {
      keywords: ["merhaba", "selam", "iyi günler", "merhaba"],
      response: "Merhaba! 👋 Size nasıl yardımcı olabilirim?",
    },
    {
      keywords: ["şifre", "şifremi unuttum", "şifre sıfırla", "parola"],
      response:
        'Şifrenizi sıfırlamak için lütfen https://hizmetgo.app/auth/reset-password adresini ziyaret edin veya "Şifremi Unuttum" butonuna tıklayın.',
      resolved: false,
      category: "ACCOUNT",
    },
    {
      keywords: ["kayıt", "kayıt ol", "üye ol", "hesap aç"],
      response:
        'Kayıt olmak için ana sayfadaki "Kayıt Ol" butonuna tıklayabilirsiniz. E-posta veya telefon numaranızla kayıt olabilirsiniz.',
      resolved: false,
      category: "ACCOUNT",
    },
    {
      keywords: ["ödeme", "para", "ücret", "fiyat", "tutar"],
      response:
        "Ödeme konusunda yardımcı olabilirim. Hangi konuda sorun yaşıyorsunuz?\n\n- Ödeme yapamıyorum\n- Ödeme iadesi\n- Fiyat bilgisi",
      resolved: false,
      category: "PAYMENT",
    },
    {
      keywords: ["sipariş", "siparişim", "order"],
      response:
        "Siparişiniz hakkında bilgi vermek için sipariş numaranızı paylaşabilir misiniz? Sipariş durumunu kontrol edebilirim.",
      resolved: false,
      category: "ORDER",
    },
    {
      keywords: ["iptal", "iade", "geri ödeme", "para iadesi"],
      response:
        'İptal veya iade işlemleri için sipariş detaylarınıza giderek "İptal Et" veya "İade Talep Et" butonunu kullanabilirsiniz. Sorun devam ederse destek ekibimize yönlendireceğim.',
      resolved: false,
      category: "REFUND",
    },
    {
      keywords: ["referans", "referral", "davet", "kazanç"],
      response:
        "Referans programı hakkında bilgi almak için https://hizmetgo.app/referral sayfasını ziyaret edebilirsiniz. Arkadaşlarınızı davet ederek her siparişten komisyon kazanabilirsiniz.",
      resolved: false,
      category: "REFERRAL",
    },
    {
      keywords: ["esnaf", "işletme", "mağaza", "kayıt ol"],
      response:
        'Esnaf kaydı için ana sayfadaki "Esnaf Ol" butonuna tıklayabilirsiniz. Kayıt işlemi tamamen ücretsizdir.',
      resolved: false,
      category: "BUSINESS",
    },
    {
      keywords: ["teknik", "hata", "bug", "çalışmıyor", "sorun"],
      response:
        "Teknik bir sorun yaşıyorsunuz. Lütfen sorununuzu detaylı bir şekilde açıklayın. Tarayıcınızı yenileyin, önbelleği temizleyin ve tekrar deneyin.",
      resolved: false,
      category: "TECHNICAL",
    },
    {
      keywords: ["teşekkür", "sağol", "tamam", "anladım", "çözüldü"],
      response: "Rica ederim! Başka bir konuda yardımcı olmamı ister misiniz?",
      resolved: true,
    },
  ];

  // Eşleşme ara
  for (const item of responses) {
    if (item.keywords.some((keyword) => message.includes(keyword))) {
      return {
        content: item.response,
        resolved: item.resolved || false,
        category: item.category,
      };
    }
  }

  // Genel yardım
  if (message.length < 10) {
    return {
      content:
        "Sorunuzu daha detaylı açıklayabilir misiniz? Size daha iyi yardımcı olabilmem için lütfen detaylı bilgi verin.",
    };
  }

  // Belirli sorular için özel cevaplar
  const specificQuestions: Array<{
    pattern: RegExp;
    response: string;
    resolved?: boolean;
  }> = [
    {
      pattern: /nasıl.*kayıt/i,
      response:
        'Kayıt olmak için:\n1. Ana sayfadaki "Kayıt Ol" butonuna tıklayın\n2. E-posta veya telefon numaranızı girin\n3. Şifrenizi oluşturun\n4. E-posta doğrulama kodunu girin\n\nKayıt tamamen ücretsizdir!',
      resolved: false,
    },
    {
      pattern: /nasıl.*sipariş/i,
      response:
        'Sipariş vermek için:\n1. Harita üzerinden bir esnaf seçin\n2. Ürün/hizmetleri sepete ekleyin\n3. Sepete gidip ödeme yapın\n\nVeya "İş İsteği Oluştur" ile ihtiyacınızı belirterek esnaflardan teklif alabilirsiniz.',
      resolved: false,
    },
    {
      pattern: /nasıl.*ödeme/i,
      response:
        'Ödeme yapmak için:\n1. Sepetinize gidin\n2. "Ödeme Yap" butonuna tıklayın\n3. Kredi kartı, banka kartı veya cüzdan bakiyenizle ödeme yapın\n\nTüm ödemeler güvenli ödeme altyapısı ile işlenmektedir.',
      resolved: false,
    },
  ];

  for (const item of specificQuestions) {
    if (item.pattern.test(message)) {
      return {
        content: item.response,
        resolved: item.resolved || false,
      };
    }
  }

  // Bot çözemezse null döner, admin'e aktarılır
  return null;
}
