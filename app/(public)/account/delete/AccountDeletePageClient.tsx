"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertTriangle,
  Trash2,
  Shield,
  FileText,
  Clock,
  Database,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export default function AccountDeletePageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"info" | "confirm" | "processing">("info");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteRequest = async () => {
    setError("");
    
    if (!email || !password) {
      setError("E-posta ve şifre gereklidir.");
      return;
    }

    if (!confirmed) {
      setError("Hesap silme işlemini onaylamanız gerekmektedir.");
      return;
    }

    if (confirmText !== "HESABIMI SİL") {
      setError("Onay metnini doğru yazmanız gerekmektedir.");
      return;
    }

    setStep("processing");
    setLoading(true);

    try {
      const res = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          reason,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTimeout(() => {
          router.push("/account/delete/success");
        }, 2000);
      } else {
        setError(data.error || "Hesap silme işlemi başarısız oldu.");
        setStep("confirm");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setStep("confirm");
    } finally {
      setLoading(false);
    }
  };

  const infoStep = (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Hesap Silme
          </h1>
          <p className="text-xl text-slate-600">
            Hesabınızı ve tüm verilerinizi kalıcı olarak silmek istediğinizden emin misiniz?
          </p>
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Uyarı:</strong> Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecektir.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Silinecek Veriler</CardTitle>
            <CardDescription>
              Hesabınız silindiğinde aşağıdaki veriler kalıcı olarak silinir:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Hesap Bilgileri</p>
                  <p className="text-sm text-slate-600">
                    E-posta, telefon, ad soyad, profil fotoğrafı
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Adres Bilgileri</p>
                  <p className="text-sm text-slate-600">
                    Kayıtlı adresler ve konum verileri
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold">İş Geçmişi</p>
                  <p className="text-sm text-slate-600">
                    Siparişler, işler, teklifler, mesajlaşma geçmişi
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Ödeme Bilgileri</p>
                  <p className="text-sm text-slate-600">
                    Cüzdan bakiyesi, ödeme geçmişi (yasal saklama süresi dolana kadar saklanabilir)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Esnaf Bilgileri</p>
                  <p className="text-sm text-slate-600">
                    İşletme bilgileri, hizmetler, yorumlar ve puanlar
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Saklanacak Veriler</CardTitle>
            <CardDescription>
              Yasal yükümlülükler gereği aşağıdaki veriler belirli süreler boyunca saklanır:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Fatura ve Ödeme Kayıtları</p>
                  <p className="text-sm text-slate-600">
                    Vergi mevzuatı gereği 10 yıl süreyle saklanır
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Güvenlik ve Yasal Kayıtlar</p>
                  <p className="text-sm text-slate-600">
                    Dolandırıcılık önleme ve yasal uyumluluk için gerekli süre boyunca saklanır
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hesap Silme Süreci</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside text-slate-700">
              <li>Hesap silme talebinizi bu sayfadan oluşturun</li>
              <li>E-posta ve şifrenizi doğrulayın</li>
              <li>Hesap silme işlemi 30 gün içinde tamamlanır</li>
              <li>Bu süre içinde hesabınızı geri alabilirsiniz</li>
              <li>30 gün sonra hesabınız ve verileriniz kalıcı olarak silinir</li>
            </ol>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="px-8"
          >
            İptal
          </Button>
          <Button
            onClick={() => setStep("confirm")}
            variant="destructive"
            className="px-8"
          >
            Devam Et
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-600">
          <p>
            Sorularınız için{" "}
            <Link href="/support/help" className="text-brand-500 hover:underline">
              destek merkezimiz
            </Link>{" "}
            ile iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );

  const processingStep = (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold mb-2">Hesap Silme İşlemi</p>
          <p className="text-slate-600">İşleminiz gerçekleştiriliyor...</p>
        </CardContent>
      </Card>
    </div>
  );

  const confirmStep = (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Hesap Silme Onayı</CardTitle>
            <CardDescription>
              Hesabınızı silmek için aşağıdaki bilgileri doldurun ve onaylayın.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-posta Adresi</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hesabınıza kayıtlı e-posta"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="hesabınızın şifresi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Neden (İsteğe Bağlı)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Hesabınızı neden silmek istediğinizi belirtin (isteğe bağlı)"
                rows={4}
              />
            </div>

            <Alert className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Önemli:</strong> Hesap silme işlemi 30 gün içinde tamamlanır. 
                Bu süre içinde hesabınızı geri alabilirsiniz.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirm"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked === true)}
                />
                <Label
                  htmlFor="confirm"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  Hesabımın ve tüm verilerimin kalıcı olarak silineceğini, 
                  bu işlemin geri alınamaz olduğunu ve yukarıda belirtilen 
                  saklama süreleri dışındaki tüm verilerimin silineceğini anladım ve kabul ediyorum.
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmText">
                  Onaylamak için <strong>"HESABIMI SİL"</strong> yazın:
                </Label>
                <Input
                  id="confirmText"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="HESABIMI SİL"
                  className="font-mono"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep("info")}
                className="flex-1"
                disabled={loading}
              >
                Geri
              </Button>
              <Button
                onClick={handleDeleteRequest}
                variant="destructive"
                className="flex-1"
                disabled={loading || !confirmed || confirmText !== "HESABIMI SİL"}
              >
                {loading ? "İşleniyor..." : "Hesabımı Sil"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {step === "info" && infoStep}
      {step === "processing" && processingStep}
      {step === "confirm" && confirmStep}
    </>
  );
}

