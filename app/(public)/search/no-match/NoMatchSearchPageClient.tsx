"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function NoMatchSearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const handleCreateUnskilledJob = () => {
    // Vasıfsız iş ilan formuna git, query'yi de götür
    router.push(`/instant-jobs/new?q=${encodeURIComponent(query)}&unskilled=true`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <CardTitle>Sonuç Bulunamadı</CardTitle>
            </div>
            <CardDescription>
              &quot;{query}&quot; için eşleşen bir hizmet kategorisi bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Bilgi:</strong> Girmeye çalıştığınız iş, vasıf aranmayan bir işse manuel
                olarak eklenir ve Vasıf Gerektirmeyen İşler bölümündeki herkese ilan olarak
                gösterilir.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Aradığınız iş:</h3>
                <p className="text-gray-700 bg-gray-100 p-3 rounded-lg">&quot;{query}&quot;</p>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleCreateUnskilledJob}
                  className="w-full"
                  size="lg"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Vasıfsız İşler İçin İlan Ver
                </Button>
              </div>

              <div className="text-center">
                <Link
                  href="/request"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Veya kategori seçerek ilan oluştur
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

