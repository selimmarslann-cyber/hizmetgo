"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  X,
  ShoppingBag,
  Wrench,
  CreditCard,
  User,
  HelpCircle,
  ArrowRight,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/lib/hooks/useToast";

// Static generation'ı engelle
// Sorun kategorileri
const problemCategories = [
  {
    id: "siparis",
    title: "Sipariş Sorunu",
    icon: ShoppingBag,
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
    description: "Sipariş takibi, iptal ve iade işlemleri",
    subCategories: [
      { id: "siparis-gelmedi", title: "Siparişim gelmedi" },
      { id: "siparis-yanlis", title: "Yanlış sipariş geldi" },
      { id: "siparis-iptal", title: "Siparişimi iptal etmek istiyorum" },
      { id: "siparis-odeme", title: "Ödeme sorunu" },
    ],
  },
  {
    id: "hizmet",
    title: "Hizmet Sorunu",
    icon: Wrench,
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
    description: "Hizmet kalitesi, gecikme ve fiyat sorunları",
    subCategories: [
      {
        id: "hizmet-kalitesi",
        title: "Hizmet kalitesi beklentimi karşılamadı",
      },
      { id: "hizmet-gecikme", title: "Hizmet gecikti" },
      { id: "hizmet-iptal", title: "Hizmet iptal edildi" },
      { id: "hizmet-fiyat", title: "Fiyat uyuşmazlığı" },
    ],
  },
  {
    id: "hesap",
    title: "Hesap Sorunu",
    icon: User,
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
    description: "Giriş, şifre ve hesap yönetimi",
    subCategories: [
      { id: "hesap-giris", title: "Giriş yapamıyorum" },
      { id: "hesap-sifre", title: "Şifremi unuttum" },
      { id: "hesap-bilgi", title: "Hesap bilgilerimi güncellemek istiyorum" },
      { id: "hesap-silme", title: "Hesabımı silmek istiyorum" },
    ],
  },
  {
    id: "odeme",
    title: "Ödeme Sorunu",
    icon: CreditCard,
    color: "bg-orange-50 hover:bg-orange-100",
    iconColor: "text-orange-600",
    description: "Ödeme, iade ve fatura işlemleri",
    subCategories: [
      { id: "odeme-reddedildi", title: "Ödeme reddedildi" },
      { id: "odeme-iade", title: "İade talep ediyorum" },
      { id: "odeme-fatura", title: "Fatura sorunu" },
      { id: "odeme-kart", title: "Kart bilgileri sorunu" },
    ],
  },
  {
    id: "diger",
    title: "Diğer",
    icon: HelpCircle,
    color: "bg-gray-50 hover:bg-gray-100",
    iconColor: "text-gray-600",
    description: "Diğer sorularınız için",
    subCategories: [],
  },
];

export default function SupportHelpPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useToast();

  const [mounted, setMounted] = useState(false);
  const [MotionComponents, setMotionComponents] = useState<{
    MotionDiv: any;
    MotionSpan?: any;
    MotionButton?: any;
    MotionP?: any;
    AnimatePresence?: any;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    import("framer-motion").then((mod) => {
      setMotionComponents({
        MotionDiv: mod.motion.div,
        MotionSpan: mod.motion.span,
        MotionButton: mod.motion.button,
        MotionP: mod.motion.p,
        AnimatePresence: mod.AnimatePresence,
      });
    });
  }, []);

  const [step, setStep] = useState<
    "category" | "subcategory" | "message" | "success"
  >("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL'den kategori parametresini kontrol et
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const category = problemCategories.find((c) => c.id === categoryParam);
      if (category) {
        setSelectedCategory(categoryParam);
        if (category.subCategories.length === 0) {
          setStep("message");
        } else {
          setStep("subcategory");
        }
      }
    }
  }, [searchParams]);

  const currentCategory = problemCategories.find(
    (c) => c.id === selectedCategory,
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "diger") {
      setStep("message");
    } else {
      setStep("subcategory");
    }
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    // Hesap silme için direkt hesap silme sayfasına yönlendir
    if (subCategoryId === "hesap-silme") {
      router.push("/account/delete");
      return;
    }
    setSelectedSubCategory(subCategoryId);
    setStep("message");
  };

  const handleSubmit = async () => {
    if (!message.trim() && !selectedSubCategory) {
      error("Lütfen sorununuzu açıklayın");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          category: selectedCategory,
          subCategory: selectedSubCategory,
          message:
            message ||
            `${currentCategory?.title} - ${currentCategory?.subCategories.find((s) => s.id === selectedSubCategory)?.title}`,
          type: selectedCategory === "diger" ? "other" : "standard",
        }),
      });

      if (response.ok) {
        setStep("success");
      } else {
        throw new Error("Mesaj gönderilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || !MotionComponents) {


    return null; // or appropriate fallback


  }



  if (!MotionComponents) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-slate-700 hover:text-slate-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Destek Merkezi
              </h1>
              <p className="text-xs text-slate-500">
                Size nasıl yardımcı olabiliriz?
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-slate-700 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <MotionComponents.AnimatePresence mode="wait">
              {/* Step 1: Kategori Seçimi */}
              {step === "category" && (
                <MotionComponents.MotionDiv
                  key="category"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                  suppressHydrationWarning
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Hangi konuda yardıma ihtiyacınız var?
                    </h2>
                    <p className="text-gray-600">
                      Sorununuzu kategorilere göre seçin, size en hızlı şekilde yardımcı olalım
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {problemCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <MotionComponents.MotionDiv
                          key={category.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => handleCategorySelect(category.id)}
                            className={`w-full p-6 rounded-xl border-2 transition-all text-left group ${category.color} hover:border-brand-300`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center flex-shrink-0`}>
                                <Icon className={`w-6 h-6 ${category.iconColor}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-brand-700">
                                  {category.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                  {category.description}
                                </p>
                                <div className="flex items-center text-brand-600 text-sm font-medium">
                                  Devam et
                                  <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                              </div>
                            </div>
                          </button>
                        </MotionComponents.MotionDiv>
                      );
                    })}
                  </div>
                  
                  {/* Quick Help */}
                  <Card className="mt-8 bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-brand-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">Hızlı Destek</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Sorununuzu kategorilere ayırmak istemiyorsanız, doğrudan canlı destek ile iletişime geçebilirsiniz.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push("/support/chat")}
                            className="border-brand-300 text-brand-600 hover:bg-brand-50"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Canlı Destek Başlat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MotionComponents.MotionDiv>
              )}

              {/* Step 2: Alt Kategori Seçimi */}
              {step === "subcategory" && currentCategory && (
                <MotionComponents.MotionDiv
                  key="subcategory"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                 suppressHydrationWarning>
                  <div className="flex items-center gap-3 mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setStep("category");
                        setSelectedCategory(null);
                      }}
                      className="text-slate-700"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {currentCategory.title}
                      </h2>
                      <p className="text-sm text-slate-500">Sorununuzu seçin</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCategory.subCategories.map((subCat, index) => {
                      const Icon = currentCategory.icon;
                      return (
                        <MotionComponents.MotionDiv
                          key={subCat.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => handleSubCategorySelect(subCat.id)}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left group ${currentCategory.color} hover:border-brand-300`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-5 h-5 ${currentCategory.iconColor}`} />
                              <span className="font-medium text-slate-900 group-hover:text-brand-700">
                                {subCat.title}
                              </span>
                            </div>
                          </button>
                        </MotionComponents.MotionDiv>
                      );
                    })}
                  </div>
                </MotionComponents.MotionDiv>
              )}

              {/* Step 3: Mesaj Yazma */}
              {step === "message" && (
                <MotionComponents.MotionDiv
                  key="message"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                 suppressHydrationWarning>
                  <div className="flex items-center gap-3 mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (selectedSubCategory) {
                          setStep("subcategory");
                          setSelectedSubCategory(null);
                        } else {
                          setStep("category");
                          setSelectedCategory(null);
                        }
                      }}
                      className="text-slate-700"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {selectedSubCategory
                          ? currentCategory?.subCategories.find(
                              (s) => s.id === selectedSubCategory,
                            )?.title
                          : "Sorununuzu açıklayın"}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Detaylı bilgi verin, size daha iyi yardımcı olalım
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Textarea
                      placeholder="Sorununuzu detaylıca açıklayın..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[200px] text-sm"
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        isSubmitting ||
                        (!message.trim() && !selectedSubCategory)
                      }
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>Gönderiliyor...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Gönder
                        </>
                      )}
                    </Button>
                  </div>
                </MotionComponents.MotionDiv>
              )}

              {/* Step 4: Başarı */}
              {step === "success" && (
                <MotionComponents.MotionDiv
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6"
                  suppressHydrationWarning
                >
                  <MotionComponents.MotionDiv
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    </div>
                  </MotionComponents.MotionDiv>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Mesajınız gönderildi!
                  </h2>
                  <div className="space-y-2">
                    <p className="text-slate-600 max-w-md text-lg">
                      En kısa sürede size dönüş yapacağız.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Genellikle 24 saat içinde yanıt veriyoruz</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={() => router.push("/support")} variant="outline">
                      Destek Merkezi
                    </Button>
                    <Button onClick={() => router.back()}>
                      Kapat
                    </Button>
                  </div>
                </MotionComponents.MotionDiv>
              )}
            </MotionComponents.AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
