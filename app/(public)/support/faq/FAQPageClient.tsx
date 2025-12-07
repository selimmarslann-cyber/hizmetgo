"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";


// Static generation'ı engelle
export default function FAQPageClient() {
  const faqCategories = [
    {
      title: "Genel Sorular",
      items: [
        {
          question: "Hizmetgo nedir?",
          answer:
            "Hizmetgo, mahalle esnafı ve hizmet sağlayıcıları ile müşterileri buluşturan bir platformdur. Hem hizmet hem ürün satın alabilir, referans programı ile kazanç elde edebilirsiniz.",
        },
        {
          question: "Nasıl kayıt olabilirim?",
          answer:
            'Ana sayfadaki "Kayıt Ol" butonuna tıklayarak e-posta veya telefon numaranızla kolayca kayıt olabilirsiniz. Referans kodu ile kayıt olursanız, hem siz hem referans veren kişi kazanır.',
        },
        {
          question: "Ücretli bir platform mu?",
          answer:
            "Platform kullanımı tamamen ücretsizdir. Sadece sipariş verdiğinizde ödeme yaparsınız. Esnaflar için de kayıt ve mağaza açma ücretsizdir, sadece her siparişte küçük bir komisyon alınır.",
        },
      ],
    },
    {
      title: "Sipariş ve Ödeme",
      items: [
        {
          question: "Nasıl sipariş verebilirim?",
          answer:
            'Harita üzerinden bir esnaf seçerek ürün/hizmetleri sepete ekleyebilir veya "İş İsteği Oluştur" özelliği ile ihtiyacınızı belirterek esnaflardan teklif alabilirsiniz.',
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer:
            "Siparişinizi oluşturduktan sonra kredi kartı, banka kartı veya cüzdan bakiyeniz ile ödeme yapabilirsiniz. Ödemeler güvenli ödeme altyapısı ile işlenmektedir.",
        },
        {
          question: "İade veya iptal yapabilir miyim?",
          answer:
            'Sipariş durumuna göre iptal edebilirsiniz. "Esnaf Kabul Etti" durumundan önce ücretsiz iptal edebilir, sonrasında esnaf ile görüşerek iptal talebinizi iletebilirsiniz. İade koşulları hizmet türüne göre değişiklik gösterebilir.',
        },
      ],
    },
    {
      title: "Referans Programı",
      items: [
        {
          question: "Referans programı nasıl çalışır?",
          answer:
            "Arkadaşlarınızı davet ettiğinizde, onların yaptığı her siparişten komisyon kazanırsınız. 5 seviyeli bir referral zinciri vardır: L1 (%10), L2 (%6), L3 (%5), L4 (%3), L5 (%1).",
        },
        {
          question: "Kazançlarımı nasıl çekebilirim?",
          answer:
            "Cüzdanınızdaki bakiyenizi IBAN bilgilerinizi girerek para çekme talebi oluşturabilirsiniz. Talepler genellikle 1-3 iş günü içinde işleme alınır.",
        },
        {
          question: "Rank sistemi nedir?",
          answer:
            "Ağınızın toplam GMV'sine göre rank kazanırsınız. Rank yükseldikçe ekstra komisyon bonusları kazanırsınız: Mahalle Lideri (+0.5%), İlçe Yöneticisi (+1.0%), İl Yöneticisi (+1.5%), Ülke Yöneticisi (+2.0%).",
        },
      ],
    },
    {
      title: "Esnaf İşlemleri",
      items: [
        {
          question: "Nasıl esnaf olabilirim?",
          answer:
            'Ana sayfadaki "Esnaf Kayıt" butonuna tıklayarak işletme bilgilerinizi girin. Kayıt işlemi tamamlandıktan sonra mağazanızı açabilir, ürün ve hizmetlerinizi listeleyebilirsiniz.',
        },
        {
          question: "Komisyon oranları nedir?",
          answer:
            "Her siparişten %10-15 arası komisyon alınır. Bu komisyonun %45'i referral ve bölge yöneticilerine dağıtılır, %55'i platform'da kalır.",
        },
        {
          question: "Ödemeler ne zaman yapılır?",
          answer:
            "Sipariş tamamlandıktan sonra komisyon düşülerek kalan tutar cüzdanınıza yüklenir. Para çekme talebi oluşturduğunuzda 1-3 iş günü içinde hesabınıza geçer.",
        },
      ],
    },
    {
      title: "Teknik Destek",
      items: [
        {
          question: "Hesabımı nasıl güvenli tutabilirim?",
          answer:
            "Güçlü bir şifre kullanın, şifrenizi kimseyle paylaşmayın. İki faktörlü doğrulamayı etkinleştirin. Şüpheli aktivite fark ederseniz hemen destek ekibimizle iletişime geçin.",
        },
        {
          question: "Uygulama çöküyor veya hata veriyor",
          answer:
            "Tarayıcınızı güncelleyin, önbelleği temizleyin. Sorun devam ederse destek botumuz ile iletişime geçin veya bize e-posta gönderin.",
        },
        {
          question: "Verilerim güvende mi?",
          answer:
            "Evet. Tüm verileriniz SSL şifreleme ile korunur ve KVKK uyumludur. Detaylı bilgi için Gizlilik Politikası ve KVKK sayfalarımızı inceleyebilirsiniz.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-[#FF6000]" />
            <h1 className="text-3xl font-bold text-gray-900">
              Sık Sorulan Sorular
            </h1>
          </div>
          <p className="text-gray-600">
            Aradığınız sorunun cevabını bulamadınız mı? Destek botumuz ile 7/24
            canlı destek alabilirsiniz.
          </p>
        </div>

        {/* Destek Bot CTA */}
        <Card className="mb-8 border-2 border-[#FF6000] bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF6000] flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Canlı Destek Botu
                  </h3>
                  <p className="text-sm text-gray-600">
                    7/24 otomatik destek, sorunlarınızı anında çözelim
                  </p>
                </div>
              </div>
              <Link href="/support/chat">
                <Button className="bg-[#FF6000] hover:bg-[#FF7000]">
                  Destek Botu ile Konuş
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`item-${categoryIndex}-${itemIndex}`}
                    >
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* İletişim */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">
              Sorunuzun cevabını bulamadınız mı?
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/support/chat">
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Destek Botu ile Konuş
                </Button>
              </Link>
              <Link href="/support/contact">
                <Button variant="outline">İletişime Geç</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
