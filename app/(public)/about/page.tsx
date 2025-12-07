import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Hizmetgo",
  description:
    "Hizmetgo hakkında bilgi. Misyonumuz, değerlerimiz ve mahalle esnafı ile müşterileri buluşturma hikayemiz.",
  keywords: [
    "hakkımızda",
    "hizmetgo",
    "misyon",
    "değerler",
    "şirket",
    "ekip",
  ],
};

export default function AboutPage() {
  const foundingDate = "04.12.2025";

  const values = [
    {
      title: "Müşteri Odaklılık",
      description:
        "Müşterilerimizin ihtiyaçlarını anlamak ve en iyi hizmet deneyimini sunmak bizim önceliğimizdir.",
      icon: Heart,
    },
    {
      title: "Güvenilirlik",
      description:
        "Esnaflarımız ve müşterilerimiz arasında güven oluşturmak ve şeffaf bir platform sunmak.",
      icon: Shield,
    },
    {
      title: "İnovasyon",
      description:
        "Teknoloji ile mahalle esnafını bir araya getirerek sektörü dönüştürmek.",
      icon: TrendingUp,
    },
    {
      title: "Toplumsal Etki",
      description:
        "Yerel ekonomiyi güçlendirmek ve mahalle esnafına destek olmak.",
      icon: Users,
    },
  ];

  const stats = [
    {
      label: "Aktif Esnaf",
      value: "10.000+",
      description: "Platformumuzda kayıtlı esnaf",
    },
    {
      label: "Başarılı İş",
      value: "500.000+",
      description: "Tamamlanan hizmet",
    },
    {
      label: "Memnun Müşteri",
      value: "250.000+",
      description: "Aktif kullanıcı",
    },
    {
      label: "Hizmet Kategorisi",
      value: "50+",
      description: "Farklı hizmet alanı",
    },
  ];

  const milestones = [
    {
      year: "2025",
      month: "Aralık",
      title: "Hizmetgo Kuruluşu",
      description:
        "Mahalle esnafı ile müşterileri buluşturma misyonuyla yola çıktık.",
    },
    {
      year: "2025",
      month: "Aralık",
      title: "Platform Lansmanı",
      description:
        "İlk versiyonumuzu yayınladık ve ilk esnaflarımızı ağırladık.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Target className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Mahalle esnafı ile müşterileri buluşturan, güvenilir ve kolay
              kullanımlı bir platform. İşini hallet.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              Kuruluş Tarihi: {foundingDate}
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Misyon */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <Target className="w-12 h-12 text-brand-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Misyonumuz
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                Hizmetgo olarak, mahalle esnafı ile müşterileri buluşturarak,
                güvenilir, hızlı ve uygun fiyatlı hizmet erişimi sağlamayı
                hedefliyoruz. Teknoloji ile yerel ekonomiyi güçlendirerek,
                herkesin ihtiyacı olan hizmeti kolayca bulabilmesini sağlıyoruz.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                &quot;İşini hallet&quot; felsefesiyle, günlük hayatın her
                alanında ihtiyaç duyulan hizmetleri tek bir platformda
                birleştiriyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Rakamlarla Hizmetgo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-all"
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Değerlerimiz */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Değerlerimiz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Hikayemiz */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Hikayemiz
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg">
                Hizmetgo, {foundingDate} tarihinde, mahalle esnafı ile
                müşterileri buluşturma misyonuyla kuruldu. Teknoloji ile yerel
                ekonomiyi bir araya getirerek, herkesin ihtiyacı olan hizmeti
                kolayca bulabilmesini sağlamayı hedefliyoruz.
              </p>
              <p>
                Günlük hayatta karşılaştığımız küçük veya büyük ihtiyaçlar için
                güvenilir esnaf bulmanın zorluğunu yaşadık. Bu zorluğu çözmek
                için, modern teknoloji ile geleneksel mahalle esnafını bir araya
                getiren bir platform oluşturduk.
              </p>
              <p>
                Bugün, binlerce esnaf ve müşteri Hizmetgo platformunda
                buluşuyor. Elektrikçiden temizlik uzmanına, tesisatçıdan boya
                ustasına kadar geniş bir hizmet yelpazesi sunuyoruz. Her gün
                daha fazla insan, işlerini Hizmetgo ile hallediyor.
              </p>
              <p>
                Gelecekte, Türkiye&apos;nin her şehrinde, her mahallesinde
                Hizmetgo&apos;nun olmasını ve herkesin ihtiyacı olan hizmeti
                kolayca bulabilmesini hedefliyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Önemli Dönüm Noktaları */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Önemli Dönüm Noktaları
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-brand-100 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-brand-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-brand-600">
                        {milestone.month} {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Neden Hizmetgo */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Neden Hizmetgo?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Güvenilir Esnaf</h3>
                <p className="text-white/90">
                  Tüm esnaflarımız kimlik doğrulamasından geçer ve değerlendirme
                  sistemi ile güvenilirlikleri sürekli kontrol edilir.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Kolay Kullanım</h3>
                <p className="text-white/90">
                  Basit ve kullanıcı dostu arayüz ile ihtiyacınız olan hizmeti
                  hızlıca bulabilir ve teklif alabilirsiniz.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Uygun Fiyatlar</h3>
                <p className="text-white/90">
                  Birden fazla esnaftan teklif alarak en uygun fiyatı bulabilir
                  ve bütçenize uygun hizmet alabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* İletişim */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              İletişim
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-slate-700 mb-8 text-center leading-relaxed">
                Sorularınız, önerileriniz veya iş birliği teklifleriniz için
                bizimle iletişime geçebilirsiniz.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <Mail className="w-8 h-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    E-posta
                  </h3>
                  <a
                    href="mailto:destek@hizmetgo.app"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    destek@hizmetgo.app
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
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <MapPin className="w-8 h-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Adres
                  </h3>
                  <p className="text-slate-600">İstanbul, Türkiye</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <Users className="w-8 h-8 text-brand-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Destek Merkezi
                  </h3>
                  <Link
                    href="/support/help"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    Destek Merkezi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-slate-50 to-brand-50 rounded-2xl p-8 md:p-12 border border-slate-200 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Hizmetgo&apos;ya Katılın
          </h2>
          <p className="text-xl mb-8 text-slate-600 max-w-2xl mx-auto">
            İşinizi büyütmek veya ihtiyacınız olan hizmeti bulmak için
            Hizmetgo&apos;ya katılın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-600 transition-colors text-lg"
            >
              Ücretsiz Kayıt Ol
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-500 text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-brand-50 transition-colors text-lg"
            >
              Esnaf Olarak Kayıt Ol
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

