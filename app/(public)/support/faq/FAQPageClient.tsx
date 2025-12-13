"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare, Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FeedbackButton from "@/components/support/FeedbackButton";
import RelatedQuestions from "@/components/support/RelatedQuestions";


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

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // URL'den search parametresini al
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Tüm soruları düzleştirilmiş liste olarak al
  const allQuestions = useMemo(() => {
    const questions: Array<{ id: string; question: string; answer: string; category: string }> = [];
    faqCategories.forEach((category) => {
      category.items.forEach((item, index) => {
        questions.push({
          id: `${category.title}-${index}`,
          question: item.question,
          answer: item.answer,
          category: category.title,
        });
      });
    });
    return questions;
  }, []);

  // Filtreleme
  const filteredCategories = useMemo(() => {
    if (!searchQuery && !selectedCategory) {
      return faqCategories;
    }

    return faqCategories
      .filter((category) => !selectedCategory || category.title === selectedCategory)
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            !searchQuery ||
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Arama sonuçlarını göster
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    router.push("/support/faq");
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-brand-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Sık Sorulan Sorular
            </h1>
          </div>
          <p className="text-gray-600">
            Aradığınız sorunun cevabını bulamadınız mı? Destek botumuz ile 7/24
            canlı destek alabilirsiniz.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Sorularınızı arayın... (örn: sipariş iptal, iade, şifre)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-brand-500 rounded-xl"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>

        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Kategori:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              Tümü
            </Badge>
            {faqCategories.map((category) => (
              <Badge
                key={category.title}
                variant={selectedCategory === category.title ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.title)}
              >
                {category.title}
              </Badge>
            ))}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="mt-2 text-sm"
            >
              <X className="w-3 h-3 mr-1" />
              Filtreleri Temizle
            </Button>
          )}
        </div>

        {/* Search Results Count */}
        {hasActiveFilters && (
          <div className="mb-4 text-sm text-gray-600">
            {filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)} sonuç bulundu
          </div>
        )}

        {/* Destek Bot CTA */}
        <Card className="mb-8 border-2 border-brand-500 bg-gradient-to-r from-brand-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center">
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
                <Button className="bg-brand-500 hover:bg-brand-600">
                  Destek Botu ile Konuş
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sonuç bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Aradığınız soruya ait bir sonuç bulunamadı. Farklı kelimeler deneyin veya destek ekibimizle iletişime geçin.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={clearFilters}>
                    Filtreleri Temizle
                  </Button>
                  <Link href="/support/contact">
                    <Button>İletişime Geç</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-2 hover:border-brand-200 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-brand-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => {
                      const questionId = `${category.title}-${itemIndex}`;
                      return (
                        <AccordionItem
                          key={itemIndex}
                          value={`item-${categoryIndex}-${itemIndex}`}
                          id={questionId}
                        >
                          <AccordionTrigger className="text-left font-medium hover:text-brand-600">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 space-y-4">
                            <div className="leading-relaxed">{item.answer}</div>
                            <FeedbackButton
                              faqId={questionId}
                              question={item.question}
                            />
                            <RelatedQuestions
                              currentCategory={category.title}
                              currentQuestionId={questionId}
                              allQuestions={allQuestions}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
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
