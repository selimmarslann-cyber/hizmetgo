import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Globe,
  Heart,
  Mail,
  MapPin,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kariyer | Hizmetgo",
  description:
    "Hizmetgo'da kariyer fırsatları. Açık pozisyonlar, çalışma kültürü ve ekibimize katılma fırsatları.",
  keywords: [
    "kariyer",
    "iş ilanları",
    "açık pozisyonlar",
    "Hizmetgo kariyer",
    "iş başvurusu",
  ],
};

export default function CareersPage() {
  const benefits = [
    {
      title: "Esnek Çalışma",
      description:
        "Uzaktan çalışma ve esnek çalışma saatleri ile iş-yaşam dengesini koruyun.",
      icon: Globe,
    },
    {
      title: "Gelişim Fırsatları",
      description:
        "Sürekli öğrenme ve gelişim fırsatları. Eğitim programları ve mentorluk desteği.",
      icon: TrendingUp,
    },
    {
      title: "Rekabetçi Maaş",
      description:
        "Sektörde rekabetçi maaş paketleri ve performans bazlı primler.",
      icon: Award,
    },
    {
      title: "Sağlık ve Refah",
      description:
        "Sağlık sigortası, özel sağlık paketi ve çeşitli refah programları.",
      icon: Heart,
    },
  ];

  const values = [
    {
      title: "Müşteri Odaklılık",
      description:
        "Müşterilerimizin ihtiyaçlarını anlamak ve en iyi deneyimi sunmak.",
    },
    {
      title: "İnovasyon",
      description:
        "Sürekli gelişim ve yenilikçi çözümler üretmek.",
    },
    {
      title: "Takım Çalışması",
      description:
        "Birlikte çalışarak daha büyük başarılar elde etmek.",
    },
    {
      title: "Şeffaflık",
      description:
        "Açık ve dürüst iletişim ile güven oluşturmak.",
    },
  ];

  const openPositions = [
    {
      title: "Yazılım Geliştirici",
      department: "Teknoloji",
      location: "İstanbul / Uzaktan",
      type: "Tam Zamanlı",
    },
    {
      title: "Ürün Yöneticisi",
      department: "Ürün",
      location: "İstanbul",
      type: "Tam Zamanlı",
    },
    {
      title: "Müşteri Deneyimi Uzmanı",
      department: "Müşteri Hizmetleri",
      location: "İstanbul / Uzaktan",
      type: "Tam Zamanlı",
    },
    {
      title: "Pazarlama Uzmanı",
      department: "Pazarlama",
      location: "İstanbul",
      type: "Tam Zamanlı",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Briefcase className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Hizmetgo&apos;da Kariyer
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Mahalle esnafı ile müşterileri buluşturan bir platformda çalışın.
              Teknoloji ile yerel ekonomiyi dönüştüren ekibimize katılın.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Neden Hizmetgo */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <Target className="w-12 h-12 text-brand-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Neden Hizmetgo?
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                Hizmetgo olarak, teknoloji ile yerel ekonomiyi bir araya getiriyoruz.
                Ekibimiz, mahalle esnafına ve müşterilere değer katmak için çalışıyor.
                Siz de bu misyona katılın ve birlikte büyüyelim.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Hızlı büyüyen bir startup ortamında, anlamlı işler yapın ve
                kariyerinizi geliştirin.
              </p>
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Çalışan Avantajları
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Değerlerimiz */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Değerlerimiz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Açık Pozisyonlar */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Açık Pozisyonlar
          </h2>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors">
                    Başvur
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">
              Size uygun bir pozisyon görmüyor musunuz?
            </p>
            <a
              href="mailto:kariyer@hizmetgo.app"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold"
            >
              <Mail className="w-5 h-5" />
              Özgeçmişinizi gönderin
            </a>
          </div>
        </section>

        {/* Çalışma Kültürü */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Çalışma Kültürümüz
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Esnek ve Denge
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Uzaktan çalışma ve esnek çalışma saatleri ile iş-yaşam
                  dengesini koruyun. Ofis veya evden, size uygun şekilde çalışın.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Sürekli Öğrenme
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Eğitim programları, konferanslar ve mentorluk desteği ile
                  sürekli gelişin. Kariyerinizi Hizmetgo&apos;da ilerletin.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Takım Ruhu
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Birlikte çalışarak daha büyük başarılar elde edin. Açık
                  iletişim ve işbirliği ile güçlü bir takım oluşturun.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Etki Yaratın
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Yaptığınız işin anlamı olsun. Mahalle esnafına ve müşterilere
                  gerçek değer katın.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* İletişim */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ekibimize Katılın
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Hizmetgo&apos;da kariyerinizi geliştirin ve anlamlı işler yapın.
              Açık pozisyonlarımızı inceleyin veya özgeçmişinizi gönderin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:kariyer@hizmetgo.app"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-lg"
              >
                <Mail className="w-5 h-5" />
                kariyer@hizmetgo.app
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

