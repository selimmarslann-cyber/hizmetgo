"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Edit } from "lucide-react";
import BillingForm from "./BillingForm";
import { useToast } from "@/lib/hooks/useToast";
interface BillingProfile {
  id: string;
  billingType: string;
  fullName?: string | null;
  tckn?: string | null;
  companyName?: string | null;
  taxNumber?: string | null;
  taxOffice?: string | null;
  country?: string | null;
  city?: string | null;
  district?: string | null;
  addressLine?: string | null;
  iban?: string | null;
  invoiceDeliveryMethod: string;
  isComplete: boolean;
}
export default function BillingPageClient() {
  const { success, error } = useToast();
  const [billingProfile, setBillingProfile] =
    useState<BillingProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    loadBillingProfile();
  }, []);
  const loadBillingProfile = async () => {
    try {
      const res = await fetch("/api/profile/billing", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBillingProfile(data.billingProfile);
        setShowForm(!data.billingProfile); // Profil yoksa form göster
      } else {
        error("Fatura profili yüklenemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };
  const handleFormSuccess = () => {
    success("Fatura bilgileriniz güncellendi.");
    loadBillingProfile();
    setShowForm(false);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Fatura Bilgileri</h1>
          <p className="text-textSecondary mt-2">
            Hizmet alıp verirken komisyon ve fatura kesimi için fatura
            bilgilerinizi doldurmanız gerekir. Bu bilgiler hem usta hem müşteri
            rolünde kullanılacaktır.
          </p>
        </div>
        {/* Uyarı/Bilgi Banner */}
        {billingProfile && (
          <Alert
            className={`mb-6 ${
              billingProfile.isComplete
                ? "bg-green-50 border-green-200"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            {billingProfile.isComplete ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Fatura bilgileriniz kayıtlı. Dilediğiniz zaman güncelleyebilirsiniz.
                </AlertDescription>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Fatura bilgileriniz eksik. Hizmet verirken ve komisyon faturaları
                  kesilirken sorun yaşamamak için lütfen bu formu doldurun.
                </AlertDescription>
              </>
            )}
          </Alert>
        )}
        {/* Özet Kartı */}
        {billingProfile && !showForm && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Fatura Bilgileri Özeti</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Bilgileri Düzenle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-textSecondary">Fatura Tipi</p>
                  <p className="font-medium">
                    {billingProfile.billingType === "PERSONAL"
                      ? "Şahıs"
                      : "Şirket"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">
                    {billingProfile.billingType === "PERSONAL"
                      ? "Ad Soyad"
                      : "Firma Ünvanı"}
                  </p>
                  <p className="font-medium">
                    {billingProfile.billingType === "PERSONAL"
                      ? billingProfile.fullName || "-"
                      : billingProfile.companyName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">
                    {billingProfile.billingType === "PERSONAL"
                      ? "TCKN"
                      : "Vergi No"}
                  </p>
                  <p className="font-medium">
                    {billingProfile.billingType === "PERSONAL"
                      ? billingProfile.tckn || "-"
                      : billingProfile.taxNumber || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">Vergi Dairesi</p>
                  <p className="font-medium">
                    {billingProfile.taxOffice || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">Şehir / İlçe</p>
                  <p className="font-medium">
                    {billingProfile.city || "-"}
                    {billingProfile.district && ` / ${billingProfile.district}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">Adres</p>
                  <p className="font-medium">
                    {billingProfile.addressLine || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">IBAN</p>
                  <p className="font-medium">{billingProfile.iban || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">
                    Faturayı nasıl almak istiyorsunuz?
                  </p>
                  <p className="font-medium">
                    {billingProfile.invoiceDeliveryMethod === "PDF_ONLY"
                      ? "Sadece PDF (Hesabım + e-posta)"
                      : billingProfile.invoiceDeliveryMethod === "E_ARCHIVE"
                        ? "e-Arşiv entegrasyonu ile otomatik"
                        : "Kendim fatura kesiyorum, sadece bilgilerimi sakla"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>
                {billingProfile ? "Fatura Bilgilerini Düzenle" : "Fatura Bilgileri"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BillingForm
                initialData={billingProfile}
                onSuccess={handleFormSuccess}
                onCancel={billingProfile ? () => setShowForm(false) : undefined}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}