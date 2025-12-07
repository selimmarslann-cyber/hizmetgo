"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/lib/hooks/useToast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryAutocomplete from "@/components/forms/CategoryAutocomplete";
import { AlertCircle, ArrowRight, Brain, CheckCircle2, Mail, MessageSquare, Phone, Sparkles, UserPlus, Zap } from "lucide-react";


// Static generation'ı engelle
export default function RegisterPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [instantJobNotifications, setInstantJobNotifications] = useState(false);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [skillCategories, setSkillCategories] = useState<string[]>([]);
  const [publishWithoutKeyword, setPublishWithoutKeyword] = useState(false);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setRefCode(ref);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const url = refCode
        ? `/api/auth/register?ref=${refCode}`
        : "/api/auth/register";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          instantJobNotifications,
          whatsappNotifications,
          smsNotifications,
          emailMarketing,
          skillCategories,
          publishWithoutKeyword,
        }),
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");
      let data;

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        if (text.includes("<!DOCTYPE") || text.includes("<html")) {
          setErrorMessage("Kayıt yapılamadı. Lütfen sayfayı yenileyin.");
        } else {
          try {
            const parsed = JSON.parse(text);
            setErrorMessage(parsed.error || "Kayıt yapılamadı.");
          } catch {
            setErrorMessage("Kayıt yapılamadı.");
          }
        }
        setLoading(false);
        return;
      }

      try {
        data = await res.json();
      } catch (jsonError) {
        setErrorMessage("Kayıt yapılamadı.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        // Detaylı hata mesajı göster
        const errorMsg = data.error || data.message || "Kayıt başarısız.";
        setErrorMessage(errorMsg);
        // Development modunda detayları göster
        if (data.details && process.env.NODE_ENV === "development") {
          console.error("Register error details:", data.details);
        }
        error(errorMsg); // Toast göster
        setLoading(false);
        return;
      }

      success("Kayıt başarılı! Hoş geldiniz!");
      router.push("/account/profile");
      router.refresh();
    } catch (err: any) {
      console.error("Register error:", err);
      setErrorMessage(err.message || "Kayıt yapılamadı.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-slate-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6000] flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Kayıt Ol
            </CardTitle>
            <CardDescription>
              Hizmetgo&apos;e katılın ve mahallendeki esnaflarla buluşun. Zaten
              hesabınız var mı?{" "}
              <Link
                href="/auth/login"
                className="text-[#FF6000] hover:underline font-semibold"
              >
                Giriş yapın
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-500">veya</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-4 text-sm text-red-700 bg-red-50 rounded-xl border-2 border-red-200">
                  <div className="font-semibold mb-1">⚠️ Kayıt Başarısız</div>
                  <div className="text-red-600">{errorMessage}</div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-900 font-semibold">
                  Ad Soyad
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 border-2 border-slate-200 focus:border-[#FF6000]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-900 font-semibold">
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-2 border-slate-200 focus:border-[#FF6000]"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-900 font-semibold"
                >
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="En az 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 border-2 border-slate-200 focus:border-[#FF6000]"
                />
              </div>

              {/* Bildirim Tercihleri */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">
                    Bildirim Tercihleri
                  </h3>
                </div>

                {/* Anlık İşler Bildirimi */}
                <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <Label
                        htmlFor="instantJobNotifications"
                        className="text-sm font-medium text-slate-900 cursor-pointer"
                      >
                        Vasıf aranmayan işlerden (ek gelir) bildirim almak ister
                        misiniz?
                      </Label>
                    </div>
                    <Switch
                      id="instantJobNotifications"
                      checked={instantJobNotifications}
                      onCheckedChange={setInstantJobNotifications}
                    />
                  </div>
                  <p className="text-xs text-slate-600">
                    50 km çevredeki anlık işlerden bildirim al. Örnek: &quot;Ödevimi
                    yapacak birini arıyorum&quot;
                  </p>
                </div>

                {/* WhatsApp Bildirimi */}
                <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      <Label
                        htmlFor="whatsappNotifications"
                        className="text-sm font-medium text-slate-900 cursor-pointer"
                      >
                        WhatsApp API&apos;den bildirim almak ister misiniz?
                      </Label>
                    </div>
                    <Switch
                      id="whatsappNotifications"
                      checked={whatsappNotifications}
                      onCheckedChange={setWhatsappNotifications}
                    />
                  </div>
                  <p className="text-xs text-slate-600">
                    Önemli bildirimleri WhatsApp üzerinden al
                  </p>
                </div>

                {/* SMS Bildirimi */}
                <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <Label
                        htmlFor="smsNotifications"
                        className="text-sm font-medium text-slate-900 cursor-pointer"
                      >
                        SMS olarak bilgilendirme almak ister misiniz?
                      </Label>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  <p className="text-xs text-slate-600">
                    Sipariş durumu ve önemli bilgileri SMS olarak al
                  </p>
                </div>

                {/* E-posta Marketing */}
                <div className="space-y-2 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange-600" />
                      <Label
                        htmlFor="emailMarketing"
                        className="text-sm font-medium text-slate-900 cursor-pointer"
                      >
                        E-posta reklam/tanıtım almak ister misiniz?
                      </Label>
                    </div>
                    <Switch
                      id="emailMarketing"
                      checked={emailMarketing}
                      onCheckedChange={setEmailMarketing}
                    />
                  </div>
                  <p className="text-xs text-slate-600">
                    Kampanyalar, özel fırsatlar ve tanıtımları e-posta ile al
                  </p>
                </div>
              </div>

              {/* Yetenek/Kategori Seçimi */}
              <div className="space-y-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Yeteneklerinizi Seçin
                      </h3>
                      <p className="text-sm text-slate-700 mb-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <strong>Önemli:</strong> Bu platformda her üye hem{" "}
                        <strong>işveren</strong> hem <strong>işyapan</strong>{" "}
                        rolündedir. Yapabileceğiniz işlerin anahtar kelimelerini
                        seçtiğinizde, bu kelimelerle ilgili ilanlar size
                        bildirim olarak gelecektir.
                      </p>
                      <Label
                        htmlFor="skillCategories"
                        className="text-base font-semibold text-slate-900"
                      >
                        Hangi kategoride yeteneklisiniz veya hizmet vermeyi
                        düşünürsünüz?
                      </Label>
                      <p className="text-sm text-slate-600 mt-1 mb-3">
                        Örnek: Elektrik, Temizlik, Tesisat, Boya, vb. (Ana
                        kategoriler seçilir, seçtiğiniz kategorinin tüm alt
                        hizmetlerinden bildirim alırsınız)
                      </p>
                      <CategoryAutocomplete
                        value={skillCategories}
                        onChange={setSkillCategories}
                        placeholder="Ana kategori ara ve seç... (örn: elektrik, temizlik)"
                        maxCategories={10}
                      />
                      <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Önemli:</strong> Bu kısım çok önemlidir!
                          Bildirimler seçeceğiniz kategorilerden gelecektir.
                          Örneğin &quot;Elektrik&quot; seçerseniz, elektrik ile ilgili tüm
                          işlerden bildirim alırsınız. Yetenekli olduğunuz veya
                          hizmet vermek istediğiniz ana kategorileri seçin.
                        </span>
                      </div>

                      {/* Anahtar Kelime Bulunamazsa Seçeneği */}
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-300">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="publishWithoutKeyword"
                            checked={publishWithoutKeyword}
                            onCheckedChange={(checked) =>
                              setPublishWithoutKeyword(checked === true)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor="publishWithoutKeyword"
                              className="text-sm font-semibold text-slate-900 cursor-pointer flex items-start gap-2"
                            >
                              <Brain className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                              <span>
                                Girdiğin mesleğe dair bir anahtar kelime
                                bulamadıysan bu kısma tik koy ve yeteneğini öyle
                                yayınla
                              </span>
                            </Label>
                            <p className="text-xs text-slate-700 mt-2 ml-7 leading-relaxed">
                              <strong className="text-purple-700">
                                Yapay zeka
                              </strong>{" "}
                              yakın kategorilerle eşleştirsin ve{" "}
                              <strong className="text-purple-700">
                                ilk işleri alma fırsatı senin olsun
                              </strong>
                              . Sistem otomatik olarak yeteneğinizi en uygun
                              kategorilerle eşleştirecek ve size özel iş
                              fırsatları sunacaktır.
                            </p>
                            <div className="mt-2 ml-7 flex items-center gap-1 text-xs text-purple-600">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>
                                Yapay zeka destekli kategori eşleştirme
                              </span>
                            </div>
                            <div className="mt-1 ml-7 flex items-center gap-1 text-xs text-purple-600">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>İlk iş fırsatlarından haberdar ol</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#FF6000] hover:bg-[#FF5500] text-white font-semibold"
                disabled={loading}
              >
                {loading ? (
                  "Kayıt yapılıyor..."
                ) : (
                  <>
                    Kayıt Ol
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Kayıt olarak{" "}
                <Link
                  href="/legal/terms"
                  className="text-[#FF6000] hover:underline"
                >
                  Kullanıcı Sözleşmesi
                </Link>{" "}
                ve{" "}
                <Link
                  href="/legal/privacy"
                  className="text-[#FF6000] hover:underline"
                >
                  Gizlilik Politikası
                </Link>
                &apos;nı kabul etmiş olursunuz.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
