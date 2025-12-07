import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Download,
  FileText,
  Globe,
  Mail,
  Newspaper,
  Phone,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Basın | Hizmetgo",
  description:
    "Hizmetgo basın bültenleri, haberler ve medya kaynakları. Basın temsilcileri için iletişim bilgileri.",
  keywords: [
    "basın",
    "medya",
    "basın bülteni",
    "haberler",
    "Hizmetgo basın",
  ],
};

export default function PressPage() {
  const pressReleases = [
    {
      date: "04.12.2025",
      title: "Hizmetgo Platformu Lansmanını Duyurdu",
      description:
        "Hizmetgo, mahalle esnafı ile müşterileri buluşturan yeni platformunu bugün lansman etti. Platform, Türkiye genelinde hizmet arayan müşteriler ile yerel esnafları bir araya getiriyor.",
      category: "Lansman",
    },
    {
      date: "04.12.2025",
      title: "Hizmetgo İlk 1000 Esnafına Ulaştı",
      description:
        "Platform lansmanından kısa bir süre sonra Hizmetgo, 1000 esnaf kaydına ulaştı. Bu başarı, platformun hızlı büyümesini ve yerel esnafın ilgisini gösteriyor.",
      category: "Haber",
    },
  ];

  const mediaKit = {
    logo: "Hizmetgo logosu ve marka kılavuzu",
    images: "Yüksek çözünürlüklü görseller",
    facts: "Şirket bilgileri ve istatistikler",
    team: "Yönetim ekibi bilgileri",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Newspaper className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Basın
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmetgo hakkında güncel haberler, basın bültenleri ve medya
              kaynakları. Basın temsilcileri için iletişim bilgileri.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Basın İletişim */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              Basın İletişim
            </h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Basın sorularınız, röportaj talepleriniz veya medya kaynakları için
              bizimle iletişime geçin.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <Mail className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  E-posta
                </h3>
                <a
                  href="mailto:basin@hizmetgo.app"
                  className="text-brand-600 hover:text-brand-700 underline"
                >
                  basin@hizmetgo.app
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <Phone className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Telefon
                </h3>
                <a
                  href="tel:+905551234567"
                  className="text-brand-600 hover:text-brand-700 underline"
                >
                  +90 (555) 123 45 67
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Basın Bültenleri */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Basın Bültenleri
          </h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold">
                        {release.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {release.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {release.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Medya Kiti */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <Download className="w-8 h-8 text-brand-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Medya Kiti
              </h2>
            </div>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Hizmetgo hakkında yazı yazmak için ihtiyacınız olan tüm kaynaklar.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(mediaKit).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 border border-slate-200"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h3>
                  <p className="text-slate-600">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="mailto:basin@hizmetgo.app"
                className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                Medya Kiti Talep Et
              </a>
            </div>
          </div>
        </section>

        {/* Şirket Bilgileri */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Şirket Bilgileri
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Hizmetgo Hakkında
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Hizmetgo, mahalle esnafı ile müşterileri buluşturan bir dijital
                  platformdur. Platform, kullanıcıların hizmet talep etmesine,
                  esnafların hizmet sunmasına ve bu süreçlerin yönetilmesine
                  olanak sağlar.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Kuruluş:</strong> 04.12.2025
                  <br />
                  <strong>Merkez:</strong> İstanbul, Türkiye
                  <br />
                  <strong>Misyon:</strong> Mahalle esnafı ile müşterileri
                  buluşturarak, güvenilir ve uygun fiyatlı hizmet erişimi sağlamak
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Hızlı İstatistikler
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• 10.000+ aktif esnaf</li>
                  <li>• 250.000+ aktif kullanıcı</li>
                  <li>• 500.000+ tamamlanan iş</li>
                  <li>• 50+ hizmet kategorisi</li>
                  <li>• Türkiye genelinde hizmet</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* İletişim */}
        <section>
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Basın Sorularınız mı Var?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Basın sorularınız, röportaj talepleriniz veya medya kaynakları için
              bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:basin@hizmetgo.app"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-lg"
              >
                <Mail className="w-5 h-5" />
                basin@hizmetgo.app
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                Hakkımızda
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

