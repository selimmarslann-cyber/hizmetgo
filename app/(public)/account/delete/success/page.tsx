import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Hesap Silme Talebi Alındı | Hizmetgo",
  description: "Hesap silme talebiniz alındı.",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default function AccountDeleteSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Hesap Silme Talebi Alındı</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">30 Günlük Bekleme Süresi</p>
                <p>
                  Hesap silme işleminiz 30 gün içinde tamamlanacaktır. Bu süre içinde 
                  hesabınızı geri almak için{" "}
                  <Link href="/support/help" className="underline font-semibold">
                    destek merkezimiz
                  </Link>{" "}
                  ile iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-slate-600 mt-0.5" />
              <div>
                <p className="font-semibold">E-posta Bildirimi</p>
                <p className="text-sm text-slate-600">
                  Hesap silme işleminiz hakkında e-posta adresinize bilgilendirme gönderilecektir.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button asChild className="w-full">
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

