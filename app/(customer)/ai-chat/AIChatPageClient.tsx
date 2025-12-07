"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AIChatBox from "@/components/AIChat/AIChatBox";


// Static generation'ı engelle
export default function AIChatPageClient() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı bilgisini al
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.user?.id) {
            setUserId(data.user.id);
          } else {
            // Giriş yapılmamış, login sayfasına yönlendir
            router.push("/auth/login?redirect=/ai-chat");
          }
        } else {
          router.push("/auth/login?redirect=/ai-chat");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/auth/login?redirect=/ai-chat");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-4" />
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return null; // Router yönlendirmesi yapacak
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            AI Asistan ile İlan Oluştur
          </h1>
          <p className="text-slate-600">
            Hizmet ihtiyacınızı belirtin, AI asistanımız size yardımcı olsun
          </p>
        </div>

        <AIChatBox userId={userId} />
      </div>
    </div>
  );
}
