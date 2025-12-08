import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Eye,
  FileText,
  Globe,
  Headphones,
  Key,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Server,
  Shield,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Güvenlik | Hizmetgo - Güvenli Hizmet Deneyimi",
  description:
    "Hizmetgo'da güvenliğiniz bizim önceliğimiz. Kişisel verilerinizin korunması, güvenli ödemeler ve esnaf doğrulama hakkında bilgi edinin.",
  keywords: [
    "güvenlik",
    "veri koruma",
    "güvenli ödeme",
    "esnaf doğrulama",
    "KVKK",
    "gizlilik",
  ],
};

export default function SafetyPage() {
  const securityFeatures = [
    {
      title: "SSL Şifreleme",
      description:
        "Tüm verileriniz 256-bit SSL şifreleme ile korunur. Web sitemiz ve mobil uygulamamız HTTPS protokolü kullanarak güvenli bağlantı sağlar.",
      icon: Lock,
    },
    {
      title: "Güvenli Ödeme",
      description:
        "Tüm ödemeler PCI DSS uyumlu ödeme altyapısı ile işlenir. Kredi kartı bilgileriniz asla bizim sunucularımızda saklanmaz.",
      icon: CreditCard,
    },
    {
      title: "Esnaf Doğrulama",
      description:
        "Tüm esnaflar kimlik doğrulamasından geçer. Telefon, e-posta ve gerekli belgeler kontrol edilir. Doğrulanmış esnaflar özel rozet ile işaretlenir.",
      icon: UserCheck,
    },
    {
      title: "KVKK Uyumluluğu",
      description:
        "Kişisel verileriniz 6698 sayılı KVKK kapsamında korunur. Verileriniz yalnızca hizmet sunumu için kullanılır ve üçüncü taraflarla paylaşılmaz.",
      icon: FileText,
    },
    {
      title: "Güvenli İletişim",
      description:
        "Esnaflarla iletişiminiz platform üzerinden güvenli şekilde yapılır. Kişisel iletişim bilgileriniz korunur ve yalnızca gerekli durumlarda paylaşılır.",
      icon: MessageSquare,
    },
    {
      title: "Veri Güvenliği",
      description:
        "Verileriniz şifrelenmiş sunucularda saklanır ve düzenli yedeklenir. Güvenlik açıklarına karşı sürekli izleme ve güncelleme yapılır.",
      icon: Server,
    },
  ];

  const safetyTips = [
    {
      title: "Doğrulanmış Esnafları Tercih Edin",
      description:
        "Profilinde doğrulama rozeti olan esnafları tercih edin. Bu esnaflar kimlik doğrulamasından geçmiştir.",
      icon: CheckCircle2,
    },
    {
      title: "Yorumları ve Puanları İnceleyin",
      description:
        "Esnaf seçmeden önce diğer müşterilerin yorumlarını ve puanlarını mutlaka okuyun. Deneyimli esnaflar genellikle daha güvenilirdir.",
      icon: Eye,
    },
    {
      title: "Platform Üzerinden Ödeme Yapın",
      description:
        "Güvenli ödeme sistemi ile ödeme yapın. Bu sayede paranız iş tamamlanana kadar korunur ve sorun yaşarsanız destek alabilirsiniz.",
      icon: CreditCard,
    },
    {
      title: "Şüpheli Davranışları Bildirin",
      description:
        "Şüpheli bir durum fark ederseniz veya güvenlik endişeniz varsa, hemen destek ekibimize ulaşın. 7/24 destek hizmetimiz hazırdır.",
      icon: AlertTriangle,
    },
    {
      title: "Kişisel Bilgilerinizi Koruyun",
      description:
        "İlk görüşmede kişisel bilgilerinizi (TC kimlik no, banka hesap bilgileri vb.) paylaşmayın. Platform üzerinden güvenli iletişim kurun.",
      icon: Shield,
    },
    {
      title: "Sözleşme ve Fiyatları Kaydedin",
      description:
        "Esnafla yaptığınız anlaşmaları ve fiyat tekliflerini platform üzerinden kaydedin. Bu, olası anlaşmazlıklarda size yardımcı olur.",
      icon: FileText,
    },
  ];

  const guarantees = [
    {
      title: "Hizmetgo Garantisi",
      description:
        "İşiniz beklendiği gibi gitmezse veya esnaf işi tamamlamazsa size yardımcı oluruz. Sorun yaşadığınızda destek ekibimize ulaşın, çözüm bulalım.",
      icon: Shield,
    },
    {
      title: "Güvenli Ödeme Koruması",
      description:
        "Platform üzerinden yaptığınız ödemeler iş tamamlanana kadar korunur. Sorun yaşarsanız ödemeniz iade edilir veya alternatif çözüm sunulur.",
      icon: Lock,
    },
    {
      title: "Esnaf Doğrulama",
      description:
        "Tüm esnaflar kimlik doğrulamasından geçer. Doğrulanmış esnaflar özel rozet ile işaretlenir ve güvenilirlikleri sürekli kontrol edilir.",
      icon: UserCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Shield className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Güvenlik ve Gizlilik
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmetgo'da güvenliğiniz bizim önceliğimiz. Kişisel verilerinizin
              korunması, güvenli ödemeler ve esnaf doğrulama ile size en güvenli
              hizmet deneyimini sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Güvenlik Özellikleri */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Güvenlik Özelliklerimiz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Güvenlik İpuçları */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-brand-50 rounded-2xl p-8 md:p-10 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-brand-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Güvenlik İpuçları
              </h2>
            </div>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Hizmetgo'yu güvenli bir şekilde kullanmak için aşağıdaki ipuçlarını
              takip edin:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {safetyTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Garantiler */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Güvenlik Garantilerimiz
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-brand-50 border-2 border-brand-200 rounded-xl p-6"
                >
                  <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {guarantee.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Veri Koruma Detayları */}
        <section className="mb-16">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-brand-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Kişisel Verilerinizin Korunması
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  KVKK Uyumluluğu
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Hizmetgo olarak, 6698 sayılı Kişisel Verilerin Korunması
                  Kanunu (KVKK) kapsamında kişisel verilerinizi korumak için
                  gerekli tüm teknik ve idari tedbirleri alıyoruz. Verileriniz
                  yalnızca hizmet sunumu için kullanılır ve yasal zorunluluklar
                  dışında üçüncü taraflarla paylaşılmaz.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Kişisel verileriniz şifrelenmiş sunucularda saklanır
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Verilerinize erişim yetkili personel ile sınırlıdır
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Düzenli güvenlik denetimleri ve güncellemeler yapılır
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Veri ihlali durumunda derhal bildirim yapılır
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Veri Kullanımı
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel verileriniz yalnızca aşağıdaki amaçlar için
                  kullanılır:
                </p>
                <ul className="space-y-2 text-slate-700 mt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Hizmet eşleştirme ve teklif sunma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Esnaf ve müşteri iletişimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Ödeme işlemleri ve fatura kesme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Müşteri desteği ve sorun çözme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Platform iyileştirme ve analiz</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ödeme Güvenliği */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 md:p-10 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-8 h-8 text-brand-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Güvenli Ödeme
              </h2>
            </div>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Tüm ödemeleriniz PCI DSS (Payment Card Industry Data Security
              Standard) uyumlu ödeme altyapısı ile işlenir. Kredi kartı
              bilgileriniz asla bizim sunucularımızda saklanmaz.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Güvenli Ödeme Özellikleri
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>256-bit SSL şifreleme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>PCI DSS uyumlu ödeme işleme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Kart bilgileri sunucularımızda saklanmaz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>3D Secure doğrulama</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Ödeme Koruması
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Ödemeniz iş tamamlanana kadar korunur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Sorun yaşarsanız iade garantisi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>7/24 destek ve sorun çözme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Şüpheli işlem bildirimi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* İletişim */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Güvenlik Sorularınız mı Var?
            </h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Güvenlik veya gizlilik ile ilgili sorularınız için destek
              ekibimizle iletişime geçin. 7/24 hizmetinizdeyiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/support/help"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
              >
                <Headphones className="w-5 h-5" />
                Destek Merkezi
              </Link>
              <a
                href="mailto:destek@hizmetgo.app"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-500 text-brand-600 px-6 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                E-posta Gönder
              </a>
            </div>
          </div>
        </section>

        {/* İlgili Bağlantılar */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            İlgili Bilgiler
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/legal/privacy"
              className="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <FileText className="w-8 h-8 text-brand-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                Gizlilik Politikası
              </h3>
              <p className="text-slate-600 text-sm">
                Kişisel verilerinizin nasıl korunduğunu öğrenin
              </p>
            </Link>
            <Link
              href="/legal/kvkk"
              className="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <Shield className="w-8 h-8 text-brand-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                KVKK Aydınlatma Metni
              </h3>
              <p className="text-slate-600 text-sm">
                KVKK kapsamında haklarınızı öğrenin
              </p>
            </Link>
            <Link
              href="/guarantee"
              className="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <CheckCircle2 className="w-8 h-8 text-brand-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                Hizmetgo Garantisi
              </h3>
              <p className="text-slate-600 text-sm">
                Güvenlik garantilerimiz hakkında bilgi edinin
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

