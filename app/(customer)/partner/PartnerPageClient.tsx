"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Award, Building2, CheckCircle2, Crown, Gift, Globe, Share2, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";


// Static generation'ı engelle
export default function PartnerPageClient() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      setIsLoggedIn(res.ok);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoToPanel = () => {
    if (isLoggedIn) {
      router.push("/business/jobs");
    } else {
      router.push("/auth/login?type=business&redirect=/business/jobs");
    }
  };

  const handleGoToReferral = () => {
    if (isLoggedIn) {
      router.push("/account/referral");
    } else {
      router.push("/auth/login?redirect=/account/referral");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Sıfır Yatırımla Ortak Ol
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Hizmetgo'de her işlemden pay kazanın, ömür boyu kazanç sağlayın
          </p>
        </div>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/3 to-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  0 Yatırımla Gerçek Ortaklık Ekonomisi
                </h2>
              </div>
              <div className="space-y-5 text-base leading-relaxed">
                <p className="text-lg font-semibold text-gray-900">
                  Hizmetgo'de sadece hizmet alıp vermiyorsunuz; mahallenizde
                  dönen her işten, kurduğunuz ağ kadar pay alıyorsunuz.
                </p>
                <p className="text-gray-700">
                  Ne şirket kurmanıza gerek var, ne sermaye bağlamanıza. Sadece
                  referans kodunuzla davet edin, sipariş geldikçe sistem sizin
                  için çalışsın.{" "}
                  <strong className="text-primary font-semibold">
                    Ömür boyu kazanç garantisi.
                  </strong>
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                    Üyelik ücreti yok
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                    Zorunlu satış yok
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                    Ömür boyu kazanç
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                    Otomatik ödeme
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nasıl Çalışır? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900 tracking-tight">
              <Zap className="w-7 h-7 text-primary" />
              Nasıl Çalışır?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Adım 1 */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-lg text-gray-900">
                        <Users className="w-5 h-5 text-primary" />
                        Referans Kodunuzu Alın
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Hesabınızı oluşturun, size özel referans kodunuzu ve
                        linkinizi alın. Profil sayfanızdan veya Referans
                        bölümünden erişebilirsiniz.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adım 2 */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-lg text-gray-900">
                        <Share2 className="w-5 h-5 text-primary" />
                        Paylaşın ve Ağ Kurun
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        WhatsApp, sosyal medya, kartvizit, dükkân camı -
                        kurallar dahilinde dilediğiniz yerde paylaşın. Her davet
                        edilen kişi ağınıza eklenir.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adım 3 */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-lg text-gray-900">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Otomatik Kazanç
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Ağınızdaki herkes sipariş verdikçe, otomatik olarak
                        cüzdanınıza pay düşer. 5 seviyeye kadar kazanç, ömür
                        boyu devam eder.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* 3 Gelir Modeli */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-2 border-primary/30 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary" />3 Gelir Modeli
              </CardTitle>
              <CardDescription className="text-base text-gray-600 leading-relaxed mt-2">
                Hizmetgo'de 3 farklı yoldan kazanç sağlayabilirsiniz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 3 Gelir Modeli */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Kullanıcı Harcamalarından Komisyon */}
                <Card className="border-2 border-primary/30 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg">
                        <Users className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        1. Kullanıcı Harcamaları
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Davet ettiğiniz her kullanıcının platformda harcadığı
                      paradan komisyon kazanırsınız. Her sipariş, her işlem size
                      kazanç getirir.
                    </p>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-xs font-semibold text-primary mb-2">
                        Örnek:
                      </p>
                      <p className="text-xs text-gray-700">
                        Davet ettiğiniz bir kullanıcı ayda 1.000 TL harcama
                        yaparsa, siz de bu harcamadan pay alırsınız.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Esnaf Satışlarından Komisyon */}
                <Card className="border-2 border-primary/30 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        2. Esnaf Satışları
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Kayıt ettirdiğiniz her esnafın yaptığı satışlardan
                      komisyon kazanırsınız. Restoran, market, terzi - her esnaf
                      sizin için pasif gelir kaynağıdır.
                    </p>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-xs font-semibold text-primary mb-2">
                        Örnek:
                      </p>
                      <p className="text-xs text-gray-700">
                        Kayıt ettirdiğiniz bir restoran ayda 50.000 TL satış
                        yaparsa, siz de bu satıştan pay alırsınız.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Referanslı Kullanıcı Kazançlarından Komisyon */}
                <Card className="border-2 border-primary/30 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        3. Referanslı Kullanıcı Kazançları
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Davet ettiğiniz kullanıcılar esnaf olarak hizmet verirse,
                      onların kazandığı paradan da komisyon alırsınız. Armut
                      benzeri sistem - hem kullanıcı hem esnaf ağından kazanç.
                    </p>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-xs font-semibold text-primary mb-2">
                        Örnek:
                      </p>
                      <p className="text-xs text-gray-700">
                        Davet ettiğiniz bir kullanıcı esnaf olarak ayda 20.000
                        TL kazanırsa, siz de bu kazançtan pay alırsınız.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gelir Modeli Özeti */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border-2 border-primary/20">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">
                  Gelir Modeli Özeti
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">
                      Esnaftan Para Kazanmak
                    </div>
                    <p className="text-xs text-gray-600">
                      Esnaf kayıt ettirerek, onların her satışından komisyon
                      alırsınız.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">
                      Anlık İşlerden Kazanmak
                    </div>
                    <p className="text-xs text-gray-600">
                      Platformdaki anlık işlerden (hizmet talepleri) komisyon
                      kazanırsınız.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">
                      Armut Benzeri Sistem
                    </div>
                    <p className="text-xs text-gray-600">
                      Referanslı kullanıcıların esnaf olarak kazandığı paradan
                      da komisyon alırsınız.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Örnek Hesaplamalar - Sadeleştirilmiş */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Nasıl Kazanırsın? Örneklerle
              </CardTitle>
              <CardDescription className="text-base">
                Sistemin nasıl çalıştığını 2 basit örnekle anlayın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* ÖRNEK 1: Basit Sipariş Örneği */}
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  Örnek 1: Basit Sipariş Örneği
                </h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-4">
                  <div className="text-sm mb-4">
                    <p className="font-semibold mb-2">Durum:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>1.000 TL'lik bir sipariş yapıldı</li>
                      <li>Platform komisyonu: %10 = 100 TL</li>
                      <li>3 seviyeli referral zinciri (L1, L2, L3)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-3 pb-3 border-b">
                      <div className="font-semibold">Aşama</div>
                      <div className="font-semibold">Hesaplama</div>
                      <div className="font-semibold text-right">Pay</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>L1 Referral</div>
                      <div className="font-mono">100 × 10% =</div>
                      <div className="text-right font-semibold text-primary">
                        10.00 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>L2 Referral</div>
                      <div className="font-mono">100 × 6% =</div>
                      <div className="text-right font-semibold text-primary">
                        6.00 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>L3 Referral</div>
                      <div className="font-mono">100 × 5% =</div>
                      <div className="text-right font-semibold text-primary">
                        5.00 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t font-semibold">
                      <div>Toplam Dağıtım</div>
                      <div></div>
                      <div className="text-right text-primary text-base">
                        21.00 TL
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Bu örnek, basit bir siparişten nasıl pay alındığını
                    gösterir. Rank yükseldikçe ve ağ büyüdükçe kazançlar artar.
                  </p>
                </div>
              </div>

              {/* ÖRNEK 2: Aylık Ağ Kazancı Örneği */}
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  Örnek 2: Aylık Ağ Kazancı Örneği
                </h4>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-5 space-y-4">
                  <div className="text-sm mb-4">
                    <p className="font-semibold mb-2 text-gray-900">
                      Durum: Aktif Ağ ile Aylık Kazanç
                    </p>
                    <p className="text-xs text-gray-600">
                      Ağınızda aktif kullanıcılar ve esnaflar var. Aylık toplam
                      ciro 100.000 TL, platform fee %10 = 10.000 TL.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 space-y-2 text-sm shadow-md">
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-3 pb-3 border-b">
                      <div className="font-semibold">Seviye</div>
                      <div className="font-semibold">Hesaplama</div>
                      <div className="font-semibold text-right">Aylık Pay</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>Level 1 (L1)</div>
                      <div className="font-mono">10.000 × 10% =</div>
                      <div className="text-right font-semibold text-primary">
                        1.000 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>Level 2 (L2)</div>
                      <div className="font-mono">10.000 × 6% =</div>
                      <div className="text-right font-semibold text-primary">
                        600 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>Level 3 (L3)</div>
                      <div className="font-mono">10.000 × 5% =</div>
                      <div className="text-right font-semibold text-primary">
                        500 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>Level 4 (L4)</div>
                      <div className="font-mono">10.000 × 3% =</div>
                      <div className="text-right font-semibold text-primary">
                        300 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>Level 5 (L5)</div>
                      <div className="font-mono">10.000 × 1% =</div>
                      <div className="text-right font-semibold text-primary">
                        100 TL
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t font-semibold text-base">
                      <div>TOPLAM AYLIK KAZANÇ</div>
                      <div></div>
                      <div className="text-right text-primary">2.500 TL/ay</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs pt-1 text-gray-600">
                      <div>Yıllık tahmini</div>
                      <div className="font-mono">2.500 × 12 =</div>
                      <div className="text-right font-semibold text-green-600">
                        ~30.000 TL/yıl
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-gray-700">
                      <strong className="text-gray-900">💡 Not:</strong> Bu
                      sadece örnek bir senaryodur. Gerçek kazanç platform hacmi,
                      ağ aktifliği ve rank seviyenize göre değişir. Rank
                      yükseldikçe bonuslar ile kazançlar artar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diğer Senaryolar - Metin Olarak */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h4 className="text-base font-semibold mb-3">
                  Diğer Kazanç Yolları:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      <strong>Rank yükseldikçe pay artar:</strong> Rank 0'dan
                      Rank 4'e çıktığınızda, aynı fee'den %20 daha fazla
                      kazanırsınız.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      <strong>Bölge yöneticisi ekstra kazanç:</strong> Mahalle,
                      İlçe, İl veya Ülke yöneticisi olarak atanırsanız, o
                      bölgedeki her siparişten ekstra %2-3 pay alırsınız.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      <strong>Esnaf kayıt ettirmek avantajlı:</strong> Bir
                      restoran veya market kayıt ettirirseniz, onların her
                      siparişinden sürekli kazanç sağlarsınız.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      <strong>
                        Network büyüdükçe kazanç exponansiyel artar:
                      </strong>{" "}
                      L2, L3 network'ünüz büyüdükçe, kazançlarınız katlanarak
                      artar.
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ömür Boyu Kazanç */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Ömür Boyu Kazanç Garantisi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Lifetime Earnings:</strong>{" "}
                Davet ettiğiniz kullanıcılar ve onların davet ettikleri kişiler,
                ağınızdan çıkmadığı sürece <strong>ömür boyu</strong> size
                kazanç sağlar.
              </p>
              <p>
                Her yeni sipariş, her yeni işlem - ağınızdaki herkesin yaptığı
                her işlemden otomatik olarak payınızı alırsınız. Sistem 7/24
                çalışır, siz uyurken bile kazanç devam eder.
              </p>
              <div className="bg-primary/5 rounded-lg p-4 mt-4">
                <p className="font-semibold text-foreground mb-2">
                  Kazanç Özellikleri:
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>
                    Otomatik cüzdana yansıma (her sipariş tamamlandığında)
                  </li>
                  <li>5 seviyeye kadar kazanç (L1-L5)</li>
                  <li>Rank bonusları ile artan kazanç</li>
                  <li>Bölge yöneticiliği ile ekstra gelir</li>
                  <li>Şeffaf ve takip edilebilir tüm işlemler</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* İpucu: Restoran/Market Kayıt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                💡 Maksimum Kazanç İpucu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-5 border border-yellow-200">
                <p className="text-base font-semibold text-foreground mb-3">
                  Aktif bir restoran veya market kayıt ettirirseniz, her
                  komisyondan ödeme alacağınız için
                  <strong className="text-primary">
                    {" "}
                    1 referanstan maksimum gelire daha kolay ulaşabilirsiniz.
                  </strong>
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Sürekli Sipariş Akışı
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Restoran ve marketler günlük onlarca sipariş alır. Her
                        siparişten komisyon kazanırsınız.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Yüksek İşlem Hacmi
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Bir restoran ayda binlerce sipariş alabilir. Bu, sürekli
                        ve yüksek kazanç demektir.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Pasif Gelir Kaynağı
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Restoran çalıştığı sürece, siz de otomatik olarak
                        kazanmaya devam edersiniz.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-primary mb-2">
                    Örnek Senaryo:
                  </p>
                  <div className="text-xs space-y-1 font-mono text-muted-foreground">
                    <div>• Bir restoran kayıt ettirdiniz (L1 seviyesinde)</div>
                    <div>
                      • Restoran ayda 500 sipariş alıyor, ortalama 200
                      TL/sipariş
                    </div>
                    <div>• Aylık ciro: 500 × 200 = 100.000 TL</div>
                    <div>• Platform fee: 100.000 × 10% = 10.000 TL</div>
                    <div>
                      • Senin payın (L1, Rank 2): 10.000 × 11% ={" "}
                      <strong className="text-primary text-sm">
                        1.100 TL/ay
                      </strong>
                    </div>
                    <div className="pt-2 border-t mt-2">
                      <div className="text-foreground font-semibold">
                        Yıllık kazanç:{" "}
                        <span className="text-primary">~13.200 TL/yıl</span>{" "}
                        (sadece 1 restorandan!)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <p>
                    <strong className="text-foreground">Strateji:</strong>{" "}
                    Birkaç aktif restoran/market kayıt ettirerek aylık
                    kazancınızı binlerce TL'ye çıkarabilirsiniz. Bu, normal
                    kullanıcı kayıt etmekten çok daha verimlidir.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liderlik ve Kariyer Basamakları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Liderlik Seviyeleri ve Bölge Ortaklığı
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Sistemde sadece davet sayınızla değil,{" "}
                <strong className="text-foreground">
                  ürettiğiniz gerçek iş hacmiyle
                </strong>{" "}
                yükselirsiniz. Network GMV (toplam ciro) büyüdükçe rank
                atlarsınız ve bonus kazanırsınız.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Mahalle Lideri (1M+ GMV)
                  </h5>
                  <p className="text-xs">
                    Ağınızın toplam cirosu 1 milyon TL'yi geçtiğinde +0.5% bonus
                    kazanırsınız.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    İlçe Yöneticisi (10M+ GMV)
                  </h5>
                  <p className="text-xs">
                    10 milyon TL'yi geçtiğinizde +1.0% bonus ve ilçe
                    yöneticiliği adaylığı.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    İl Yöneticisi (100M+ GMV)
                  </h5>
                  <p className="text-xs">
                    100 milyon TL'yi geçtiğinizde +1.5% bonus ve il yöneticiliği
                    adaylığı.
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Ülke Yöneticisi (500M+ GMV)
                  </h5>
                  <p className="text-xs">
                    500 milyon TL'yi geçtiğinizde +2.0% bonus ve ülke
                    yöneticiliği adaylığı.
                  </p>
                </div>
              </div>
              <p className="pt-2">
                <strong className="text-foreground">Önemli:</strong> Hiç kimse
                ilk gün girip ülke lideri olamaz; tüm rütbeler belirlenmiş ciro
                barajı, ağ büyüklüğü ve kalite puanı kriterleriyle hak edilerek
                alınır.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medya Kuruluşları Notu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                    Medya kuruluşlarına vereceğimiz payı,{" "}
                    <span className="text-indigo-600 font-bold">
                      sizler için ayırdık.
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Reklam bütçelerini referral sistemine aktararak, gerçek
                    kullanıcılarımıza daha fazla değer sağlıyoruz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Güven & Şeffaflık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Güven & Şeffaflık
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Sisteme giriş ücreti yoktur
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Tamamen ücretsiz başlayın
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Zorunlu paket, ürün veya üyelik satışı yoktur
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Sadece gerçek işlemlerden kazanç
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Tüm kazançlar gerçek hizmet siparişlerinden doğar
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Platform fee'sinden pay alırsınız
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Şeffaf oranlar ve barajlar
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Tüm detaylar hesabınızda görüntülenebilir
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Otomatik ödeme sistemi
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Her sipariş tamamlandığında cüzdanınıza otomatik yansır
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Serbest Tanıtım ve Kalite Kuralları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Serbest Tanıtım Hakkı, Kalite Sorumluluğu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Referans kodunuzu ve linkinizi; sosyal medya hesaplarınızda, web
                sitenizde, WhatsApp gruplarında, kartvizit ve afişlerde
                dilediğiniz gibi paylaşabilirsiniz.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">
                  Yasak Olanlar:
                </p>
                <ul className="space-y-1 list-disc list-inside text-red-800 text-xs">
                  <li>Yalan veya abartılı kazanç vaadi</li>
                  <li>Scam/dolandırıcılık izlenimi veren içerik</li>
                  <li>Spam niteliğinde toplu çağrımlar</li>
                  <li>Platform itibarına zarar veren paylaşımlar</li>
                </ul>
              </div>
              <p className="font-medium text-foreground pt-2">
                Bu sistemde sadece çok kazanan değil,{" "}
                <strong>
                  temiz ve güvenilir büyüyen kullanıcılar lider olabilir.
                </strong>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-4 pt-4"
        >
          <Button
            onClick={handleGoToReferral}
            className="w-full"
            size="lg"
            variant="default"
          >
            <Gift className="w-5 h-5 mr-2" />
            Referans Sistemime Git
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => router.push("/business/register")}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Esnaf Kaydı Yap
            </Button>
            <Button
              onClick={handleGoToPanel}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Esnaf Paneline Git
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
