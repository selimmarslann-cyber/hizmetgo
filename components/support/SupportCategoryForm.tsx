"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Wrench,
  CreditCard,
  User,
  Building2,
  HelpCircle,
  MoreHorizontal,
  ArrowRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/lib/hooks/useToast";

const supportCategories = [
  {
    id: "ORDER",
    title: "Sipariş Sorunu",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
    subCategories: [
      { id: "siparis-gelmedi", title: "Siparişim gelmedi" },
      { id: "siparis-yanlis", title: "Yanlış sipariş geldi" },
      { id: "siparis-iptal", title: "Siparişimi iptal etmek istiyorum" },
      { id: "siparis-odeme", title: "Ödeme sorunu" },
    ],
  },
  {
    id: "TECHNICAL",
    title: "Hizmet Sorunu",
    icon: Wrench,
    color: "bg-purple-100 text-purple-600",
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
    id: "PAYMENT",
    title: "Ödeme Sorunu",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
    subCategories: [
      { id: "odeme-reddedildi", title: "Ödeme reddedildi" },
      { id: "odeme-iade", title: "İade talep ediyorum" },
      { id: "odeme-fatura", title: "Fatura sorunu" },
      { id: "odeme-kart", title: "Kart bilgileri sorunu" },
    ],
  },
  {
    id: "ACCOUNT",
    title: "Hesap Sorunu",
    icon: User,
    color: "bg-orange-100 text-orange-600",
    subCategories: [
      { id: "hesap-giris", title: "Giriş yapamıyorum" },
      { id: "hesap-sifre", title: "Şifremi unuttum" },
      { id: "hesap-bilgi", title: "Hesap bilgilerimi güncellemek istiyorum" },
      { id: "hesap-silme", title: "Hesabımı silmek istiyorum" },
    ],
  },
  {
    id: "BUSINESS",
    title: "Esnaf Kaydı",
    icon: Building2,
    color: "bg-indigo-100 text-indigo-600",
    subCategories: [
      { id: "esnaf-kayit", title: "Esnaf olarak kayıt olmak istiyorum" },
      { id: "esnaf-onay", title: "Kayıt onayı bekliyorum" },
      { id: "esnaf-bilgi", title: "Esnaf bilgilerimi güncellemek istiyorum" },
    ],
  },
  {
    id: "GENERAL",
    title: "Genel Soru/Şikayet",
    icon: HelpCircle,
    color: "bg-yellow-100 text-yellow-600",
    subCategories: [],
  },
  {
    id: "OTHER",
    title: "Diğer",
    icon: MoreHorizontal,
    color: "bg-gray-100 text-gray-600",
    subCategories: [],
  },
];

export default function SupportCategoryForm({
  onClose,
}: {
  onClose?: () => void;
}) {
  const router = useRouter();
  const { success, error } = useToast();
  const [step, setStep] = useState<
    "category" | "subcategory" | "message" | "success"
  >("category");
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof supportCategories)[0] | null
  >(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategorySelect = (category: (typeof supportCategories)[0]) => {
    setSelectedCategory(category);
    if (category.subCategories.length === 0 || category.id === "OTHER") {
      setStep("message");
    } else {
      setStep("subcategory");
    }
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
    setStep("message");
  };

  const handleSubmit = async () => {
    if (!selectedCategory) return;

    // "Diğer" veya subcategory seçilmişse mesaj zorunlu
    if (
      (selectedCategory.id === "OTHER" || selectedSubCategory) &&
      !message.trim()
    ) {
      error("Lütfen sorununuzu açıklayın");
      return;
    }

    setIsSubmitting(true);
    try {
      const subCategoryTitle = selectedCategory.subCategories.find(
        (s) => s.id === selectedSubCategory,
      )?.title;

      const ticketMessage = selectedSubCategory
        ? `${subCategoryTitle}\n\n${message.trim() || ""}`
        : message.trim() || selectedCategory.title;

      const response = await fetch("/api/support/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          category: selectedCategory.id,
          subject: selectedSubCategory
            ? `${selectedCategory.title} - ${subCategoryTitle}`
            : selectedCategory.title,
          message: ticketMessage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setStep("success");
        // 3 saniye sonra inbox'a yönlendir
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
          router.push(`/inbox/support/${data.ticketId}`);
        }, 3000);
        success(
          "Talebiniz gönderildi! En kısa sürede size dönüş yapılacaktır.",
        );
      } else {
        const data = await response.json();
        throw new Error(data.error || "Talep gönderilemedi");
      }
    } catch (err: any) {
      error(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 1: Kategori Seçimi */}
        {step === "category" && (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Size nasıl yardımcı olabiliriz?
              </h2>
              <p className="text-gray-600">
                Lütfen sorununuzun kategorisini seçin
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {supportCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-[#FF6000] hover:bg-orange-50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-900 group-hover:text-[#FF6000]">
                          {category.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6000]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Alt Kategori Seçimi */}
        {step === "subcategory" && selectedCategory && (
          <motion.div
            key="subcategory"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStep("category");
                  setSelectedCategory(null);
                }}
                className="text-gray-700"
              >
                ← Geri
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory.title}
                </h2>
                <p className="text-sm text-gray-500">Sorununuzu seçin</p>
              </div>
            </div>
            <div className="space-y-2">
              {selectedCategory.subCategories.map((subCat) => (
                <button
                  key={subCat.id}
                  onClick={() => handleSubCategorySelect(subCat.id)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-[#FF6000] hover:bg-orange-50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 group-hover:text-[#FF6000]">
                      {subCat.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6000]" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Mesaj Yazma */}
        {step === "message" && selectedCategory && (
          <motion.div
            key="message"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
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
                className="text-gray-700"
              >
                ← Geri
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedSubCategory
                    ? selectedCategory.subCategories.find(
                        (s) => s.id === selectedSubCategory,
                      )?.title
                    : selectedCategory.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Sorununuzu detaylıca açıklayın
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder={
                  selectedCategory.id === "OTHER"
                    ? "Sorununuzu detaylıca açıklayın..."
                    : "Sorununuzu detaylıca açıklayın (isteğe bağlı, ancak daha hızlı çözüm için önerilir)..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] text-sm"
              />
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  (selectedCategory.id === "OTHER" && !message.trim())
                }
                className="w-full bg-[#FF6000] hover:bg-[#E65500]"
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
          </motion.div>
        )}

        {/* Step 4: Başarı */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Talebiniz gönderildi!
            </h2>
            <p className="text-gray-600 max-w-md">
              En kısa sürede size dönüş yapacağız. Genellikle 24 saat içinde
              yanıt veriyoruz.
              <br />
              <span className="text-sm text-gray-500">
                Gelen kutunuza yönlendiriliyorsunuz...
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
