"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/useToast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


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
  const [unskilledJobNotifications, setUnskilledJobNotifications] = useState(false);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [emailMarketing, setEmailMarketing] = useState(false);

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
          unskilledJobNotifications,
          whatsappNotifications,
          smsNotifications,
          emailMarketing,
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

      success("Kayıt başarılı! Yeteneklerinizi seçin.");
      router.push("/auth/register/skills");
      router.refresh();
    } catch (err: any) {
      console.error("Register error:", err);
      setErrorMessage(err.message || "Kayıt yapılamadı.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <Card className="border border-slate-200">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Kayıt Ol
            </CardTitle>
            <CardDescription>
              Hizmetgo&apos;e katılın ve mahallendeki esnaflarla buluşun. Zaten
              hesabınız var mı?{" "}
              <Link
                href="/auth/login"
                className="text-brand-500 hover:underline font-semibold"
              >
                Giriş yapın
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 text-sm text-red-700 bg-red-50 rounded border border-red-200">
                  <div className="font-semibold mb-1">Kayıt Başarısız</div>
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
                  className="h-12 border border-slate-200 focus:border-brand-500"
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
                  className="h-12 border border-slate-200 focus:border-brand-500"
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
                  className="h-12 border border-slate-200 focus:border-brand-500"
                />
              </div>

              {/* Bildirim Tercihleri */}
              <div className="space-y-6 p-6 border border-slate-200 rounded">
                <h3 className="text-lg font-semibold text-slate-900">
                  Bildirim Tercihleri
                </h3>

                {/* Anlık İşler Bildirimi */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="instantJobNotifications"
                      className="text-base font-medium text-slate-900 cursor-pointer"
                    >
                      Anlık işlerden bildirim almak ister misiniz?
                    </Label>
                    <Switch
                      id="instantJobNotifications"
                      checked={instantJobNotifications}
                      onCheckedChange={setInstantJobNotifications}
                    />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    50 km çevredeki anlık işlerden bildirim alırsınız. Örnek: &quot;Ödevimi yapacak birini arıyorum&quot; gibi acil iş ilanlarından anında haberdar olursunuz. Bu bildirimler sayesinde yakınınızdaki anlık iş fırsatlarını kaçırmazsınız.
                  </p>
                </div>

                {/* Vasıfsız İşler Bildirimi */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="unskilledJobNotifications"
                      className="text-base font-medium text-slate-900 cursor-pointer"
                    >
                      Vasıf gerektirmeyen işlerden bildirim alarak ek kazanç sağlamak istiyorum
                    </Label>
                    <Switch
                      id="unskilledJobNotifications"
                      checked={unskilledJobNotifications}
                      onCheckedChange={setUnskilledJobNotifications}
                    />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Bulunduğunuz ilde yayınlanan vasıfsız iş ilanları için bildirim alırsınız. Bu tür işler özel bir yetenek veya eğitim gerektirmez ve ek gelir sağlamanıza yardımcı olur. İsterseniz sonradan Profil &gt; Bildirimler bölümünden bu bildirimleri kapatabilirsiniz.
                  </p>
                </div>

                {/* WhatsApp Bildirimi */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="whatsappNotifications"
                      className="text-base font-medium text-slate-900 cursor-pointer"
                    >
                      WhatsApp API&apos;den bildirim almak ister misiniz?
                    </Label>
                    <Switch
                      id="whatsappNotifications"
                      checked={whatsappNotifications}
                      onCheckedChange={setWhatsappNotifications}
                    />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Önemli bildirimleri WhatsApp üzerinden alırsınız. Sipariş durumları, mesajlar ve önemli güncellemeler WhatsApp üzerinden size ulaşır. Bu sayede telefonunuzu sürekli kontrol etmenize gerek kalmaz.
                  </p>
                </div>

                {/* SMS Bildirimi */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="smsNotifications"
                      className="text-base font-medium text-slate-900 cursor-pointer"
                    >
                      SMS olarak bilgilendirme almak ister misiniz?
                    </Label>
                    <Switch
                      id="smsNotifications"
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Sipariş durumu ve önemli bilgileri SMS olarak alırsınız. Özellikle internet bağlantınız olmadığında veya uygulamayı açmadığınızda bile önemli güncellemelerden haberdar olursunuz.
                  </p>
                </div>

                {/* E-posta Marketing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="emailMarketing"
                      className="text-base font-medium text-slate-900 cursor-pointer"
                    >
                      E-posta reklam/tanıtım almak ister misiniz?
                    </Label>
                    <Switch
                      id="emailMarketing"
                      checked={emailMarketing}
                      onCheckedChange={setEmailMarketing}
                    />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Kampanyalar, özel fırsatlar ve tanıtımları e-posta ile alırsınız. Yeni özellikler, özel indirimler ve platformdaki gelişmeler hakkında bilgilendirilirsiniz. İstediğiniz zaman bu e-postaları durdurabilirsiniz.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-semibold"
                disabled={loading}
              >
                {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Kayıt olarak{" "}
                <Link
                  href="/legal/terms"
                  className="text-brand-500 hover:underline"
                >
                  Kullanıcı Sözleşmesi
                </Link>{" "}
                ve{" "}
                <Link
                  href="/legal/privacy"
                  className="text-brand-500 hover:underline"
                >
                  Gizlilik Politikası
                </Link>
                &apos;nı kabul etmiş olursunuz.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
