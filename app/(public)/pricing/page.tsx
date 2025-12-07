import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  Heart,
  Info,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fiyat Tahminleri | Hizmetgo - Gerçek Fiyat Verileri ve Rehberler",
  description:
    "Hizmetgo'da gerçek fiyat verileriyle fiyat tahminleri. Kategori bazlı fiyat aralıkları, fiyat hesaplayıcı, uygun fiyat garantisi ve detaylı rehberler.",
  keywords: [
    "fiyat tahminleri",
    "hizmet fiyatları",
    "esnaf fiyatları",
    "fiyat rehberi",
    "uygun fiyatlı hizmet",
  ],
};

export default function PricingPage() {
  const serviceCategories = [
    {
      category: "Elektrik İşleri",
      icon: Zap,
      services: [
        {
          name: "Prizi Değiştirme",
          min: 200,
          max: 500,
          average: 350,
          unit: "adet",
          factors: ["Prizi tipi", "Duvar tipi", "Kablo uzunluğu"],
        },
        {
          name: "Sigorta Tamiri",
          min: 300,
          max: 800,
          average: 550,
          unit: "iş",
          factors: ["Sigorta tipi", "Panel durumu", "Acil durum"],
        },
        {
          name: "Aydınlatma Kurulumu",
          min: 400,
          max: 1500,
          average: 900,
          unit: "adet",
          factors: ["Lamba tipi", "Tavan yüksekliği", "Kurulum karmaşıklığı"],
        },
        {
          name: "Elektrik Panosu Bakımı",
          min: 500,
          max: 2000,
          average: 1200,
          unit: "iş",
          factors: ["Panel boyutu", "Bakım kapsamı", "Yedek parça"],
        },
      ],
    },
    {
      category: "Temizlik Hizmetleri",
      icon: Sparkles,
      services: [
        {
          name: "Ev Temizliği (Standart)",
          min: 300,
          max: 800,
          average: 550,
          unit: "seans",
          factors: ["Ev büyüklüğü", "Temizlik türü", "Sıklık"],
        },
        {
          name: "Derin Temizlik",
          min: 800,
          max: 2500,
          average: 1500,
          unit: "seans",
          factors: ["Alan büyüklüğü", "Kirlilik seviyesi", "Özel gereksinimler"],
        },
        {
          name: "Ofis Temizliği",
          min: 500,
          max: 2000,
          average: 1200,
          unit: "seans",
          factors: ["Ofis büyüklüğü", "Temizlik sıklığı", "Özel ekipman"],
        },
        {
          name: "Cam Temizliği",
          min: 200,
          max: 800,
          average: 450,
          unit: "m²",
          factors: ["Pencere sayısı", "Yükseklik", "Erişim zorluğu"],
        },
      ],
    },
    {
      category: "Boya Badana",
      icon: Target,
      services: [
        {
          name: "Oda Boyama",
          min: 1500,
          max: 4000,
          average: 2750,
          unit: "oda",
          factors: ["Oda büyüklüğü", "Duvar durumu", "Boya kalitesi"],
        },
        {
          name: "Tavan Boyama",
          min: 800,
          max: 2500,
          average: 1650,
          unit: "m²",
          factors: ["Tavan yüksekliği", "Yüzey durumu", "Erişim"],
        },
        {
          name: "Dış Cephe Boyama",
          min: 3000,
          max: 15000,
          average: 8000,
          unit: "m²",
          factors: ["Bina yüksekliği", "Yüzey durumu", "İskele gereksinimi"],
        },
        {
          name: "Kapı/Pencere Boyama",
          min: 300,
          max: 1200,
          average: 750,
          unit: "adet",
          factors: ["Boyut", "Malzeme", "Hazırlık işleri"],
        },
      ],
    },
    {
      category: "Tesisat İşleri",
      icon: TrendingUp,
      services: [
        {
          name: "Musluk Tamiri",
          min: 200,
          max: 600,
          average: 400,
          unit: "adet",
          factors: ["Musluk tipi", "Arıza türü", "Yedek parça"],
        },
        {
          name: "Tıkanıklık Açma",
          min: 300,
          max: 1000,
          average: 650,
          unit: "iş",
          factors: ["Tıkanıklık seviyesi", "Lokasyon", "Acil durum"],
        },
        {
          name: "Su Kaçağı Tamiri",
          min: 500,
          max: 2000,
          average: 1200,
          unit: "iş",
          factors: ["Kaçak yeri", "Erişim zorluğu", "Malzeme değişimi"],
        },
        {
          name: "Klozet Montajı",
          min: 800,
          max: 2500,
          average: 1650,
          unit: "adet",
          factors: ["Klozet tipi", "Mevcut tesisat", "Duvar işleri"],
        },
      ],
    },
    {
      category: "Nakliyat",
      icon: MapPin,
      services: [
        {
          name: "Eşya Taşıma (Küçük)",
          min: 500,
          max: 1500,
          average: 1000,
          unit: "sefer",
          factors: ["Eşya miktarı", "Mesafe", "Kat sayısı"],
        },
        {
          name: "Ev Taşıma (1+1)",
          min: 2000,
          max: 6000,
          average: 4000,
          unit: "iş",
          factors: ["Eşya miktarı", "Mesafe", "Paketleme"],
        },
        {
          name: "Ev Taşıma (2+1)",
          min: 3000,
          max: 8000,
          average: 5500,
          unit: "iş",
          factors: ["Eşya miktarı", "Mesafe", "Paketleme"],
        },
        {
          name: "Ofis Taşıma",
          min: 5000,
          max: 20000,
          average: 12000,
          unit: "iş",
          factors: ["Ofis büyüklüğü", "Ekipman", "Mesafe"],
        },
      ],
    },
    {
      category: "Çilingir",
      icon: Shield,
      services: [
        {
          name: "Kilit Açma",
          min: 300,
          max: 800,
          average: 550,
          unit: "iş",
          factors: ["Kilit tipi", "Acil durum", "Saat"],
        },
        {
          name: "Anahtar Kopyalama",
          min: 50,
          max: 200,
          average: 125,
          unit: "adet",
          factors: ["Anahtar tipi", "Malzeme", "Karmaşıklık"],
        },
        {
          name: "Kilit Değişimi",
          min: 400,
          max: 1500,
          average: 950,
          unit: "adet",
          factors: ["Kilit tipi", "Kapı tipi", "Montaj zorluğu"],
        },
        {
          name: "Güvenlik Sistemi",
          min: 2000,
          max: 10000,
          average: 6000,
          unit: "sistem",
          factors: ["Sistem tipi", "Nokta sayısı", "Teknoloji"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Calculator className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Fiyat Tahminleri ve Rehberler
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Gerçek fiyat verileriyle hazırlanmış kapsamlı fiyat rehberleri.
              Binlerce tamamlanmış işten derlenen güvenilir fiyat aralıkları.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Bilgilendirme */}
        <div className="bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-200 mb-12">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Fiyat Tahminleri Hakkında
              </h3>
              <p className="text-blue-800 leading-relaxed mb-3">
                Bu fiyat aralıkları, Hizmetgo platformunda son 6 ayda tamamlanan
                binlerce gerçek işten derlenmiştir. Fiyatlar, işin kapsamı,
                konum, esnaf deneyimi ve diğer faktörlere göre değişebilir. En
                doğru fiyat için birden fazla esnaftan teklif almanızı öneririz.
              </p>
              <p className="text-sm text-blue-700">
                <strong>Not:</strong> Tüm fiyatlar Türk Lirası (₺) cinsindendir
                ve 2025 yılı verilerine dayanmaktadır.
              </p>
            </div>
          </div>
        </div>

        {/* Kategori Bazlı Fiyat Rehberleri */}
        <div className="space-y-12 mb-16">
          {serviceCategories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <section key={catIndex} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Kategori Başlığı */}
                <div className="bg-gradient-to-r from-brand-50 to-slate-50 px-6 md:px-8 py-6 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        {category.category}
                      </h2>
                      <p className="text-slate-600 mt-1">
                        {category.services.length} farklı hizmet için fiyat aralıkları
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hizmetler Tablosu */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-left font-bold text-slate-900">
                          Hizmet
                        </th>
                        <th className="px-6 py-4 text-center font-bold text-slate-900">
                          Minimum
                        </th>
                        <th className="px-6 py-4 text-center font-bold text-slate-900">
                          Ortalama
                        </th>
                        <th className="px-6 py-4 text-center font-bold text-slate-900">
                          Maksimum
                        </th>
                        <th className="px-6 py-4 text-left font-bold text-slate-900">
                          Fiyatı Etkileyen Faktörler
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.services.map((service, serviceIndex) => (
                        <tr
                          key={serviceIndex}
                          className={serviceIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          <td className="px-6 py-4 border-b border-slate-200">
                            <div>
                              <div className="font-semibold text-slate-900 mb-1">
                                {service.name}
                              </div>
                              <div className="text-sm text-slate-500">
                                Birim: {service.unit}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center border-b border-slate-200">
                            <span className="inline-flex items-center gap-1 text-green-600 font-bold">
                              <TrendingDown className="w-4 h-4" />
                              {service.min.toLocaleString("tr-TR")} ₺
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center border-b border-slate-200">
                            <span className="inline-flex items-center gap-1 text-brand-600 font-bold text-lg">
                              <DollarSign className="w-4 h-4" />
                              {service.average.toLocaleString("tr-TR")} ₺
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center border-b border-slate-200">
                            <span className="text-slate-700 font-semibold">
                              {service.max.toLocaleString("tr-TR")} ₺
                            </span>
                          </td>
                          <td className="px-6 py-4 border-b border-slate-200">
                            <div className="flex flex-wrap gap-2">
                              {service.factors.map((factor, factorIndex) => (
                                <span
                                  key={factorIndex}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                                >
                                  <AlertCircle className="w-3 h-3" />
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>

        {/* Fiyatı Etkileyen Genel Faktörler */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Fiyatı Etkileyen Genel Faktörler
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                İşin Kapsamı
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                İşin büyüklüğü, karmaşıklığı ve süresi fiyatı doğrudan etkiler.
                Daha büyük ve karmaşık işler daha yüksek fiyatlıdır.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Konum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Şehir, bölge ve ulaşım mesafesi fiyatları etkiler. Büyük
                şehirlerde fiyatlar genellikle daha yüksektir.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Esnaf Deneyimi
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Deneyimli ve sertifikalı esnaflar genellikle daha yüksek fiyat
                talep eder, ancak kalite garantisi sunarlar.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Aciliyet</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Acil işler, hafta sonu ve tatil günleri için ek ücret
                uygulanabilir. Planlı işler daha uygun fiyatlıdır.
              </p>
            </div>
          </div>
        </section>

        {/* Uygun Fiyat İpuçları */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-10 border border-emerald-200">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Uygun Fiyat İpuçları
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-emerald-600" />
                  Birden Fazla Teklif Alın
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  En az 3-5 esnaftan teklif alarak fiyatları karşılaştırın. Bu
                  sayede hem en uygun fiyatı bulursunuz hem de esnaflar arasında
                  sağlıklı rekabet oluşur. Farklı fiyat aralıklarını görerek
                  kalite-fiyat dengesini değerlendirebilirsiniz.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Farklı fiyat aralıklarını görün</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Kalite-fiyat dengesini değerlendirin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>En iyi değeri seçin</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  Planlı İşler Daha Uygun
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Acil olmayan işler için önceden planlama yapın. Planlı işler
                  hem daha uygun fiyatlıdır hem de esnaflar için daha uygun
                  zamanlarda yapılabilir. 1-2 hafta önceden planlama yaparak
                  acil ücreti ödemekten kaçınabilirsiniz.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>1-2 hafta önceden planlama yapın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Acil ücreti ödemekten kaçının</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Daha iyi zamanlama seçenekleri</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Uygun Fiyat Felsefesi */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-50 to-emerald-50 rounded-2xl p-8 md:p-12 border border-brand-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Uygun Fiyat Felsefemiz
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Hizmetgo olarak, herkesin kaliteli hizmetlere uygun fiyatlarla
                  erişebilmesi gerektiğine inanıyoruz. Platformumuz, şeffaf
                  fiyatlandırma ve rekabetçi tekliflerle müşterilerimize en iyi
                  değeri sunmayı hedefler.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-brand-200">
                <TrendingDown className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Rekabetçi Fiyatlar
                </h3>
                <p className="text-slate-600">
                  Birden fazla esnaftan teklif alarak en uygun fiyatı bulun.
                  Rekabet sayesinde fiyatlar her zaman adil kalır ve
                  müşterilerimiz en iyi değeri alır.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-brand-200">
                <Shield className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Şeffaf Fiyatlandırma
                </h3>
                <p className="text-slate-600">
                  Gizli ücret yok. Tüm fiyatlar açık ve net. Ek ücretler
                  önceden belirtilir, sürpriz yok. Müşterilerimiz ne
                  ödeyeceklerini önceden bilirler.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-brand-200">
                <Target className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Adil Piyasa
                </h3>
                <p className="text-slate-600">
                  Esnaflar arasında sağlıklı rekabet, müşterilere daha iyi
                  fiyatlar ve kaliteli hizmetler sağlar. Herkes kazanır.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen Uygun Fiyatlı Hizmet Bulun
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Hizmetgo'da binlerce esnaftan teklif alın, en uygun fiyatı bulun ve
            işinizi hallettirin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Hizmet Ara ve Teklif Al
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Nasıl Kullanılır?
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
