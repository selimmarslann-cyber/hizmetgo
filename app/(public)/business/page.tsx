import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
  Heart,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Esnaflar İçin Hizmetgo | İşinizi Büyütün, Daha Fazla Müşteri Bulun",
  description:
    "Hizmetgo ile işinizi büyütün. Binlerce müşteriye ulaşın, daha fazla iş alın ve gelirinizi artırın. Ücretsiz kayıt olun ve işinizi dijitalleştirin.",
  keywords: [
    "esnaf kayıt",
    "hizmet sağlayıcı",
    "iş büyütme",
    "müşteri bulma",
    "dijital platform",
  ],
};

export default function BusinessPage() {
  const benefits = [
    {
      title: "Daha Fazla Müşteri",
      description:
        "Hizmetgo platformunda binlerce aktif müşteri sizden hizmet bekliyor. Profilinizi oluşturun, hizmetlerinizi tanıtın ve yeni müşteriler bulun.",
      icon: Users,
      stats: "10.000+",
      statLabel: "Aktif Müşteri",
    },
    {
      title: "Gelir Artışı",
      description:
        "Platform üzerinden gelen işlerle gelirinizi artırın. Rekabetçi fiyatlandırma ve kaliteli hizmet sunarak müşteri memnuniyeti sağlayın.",
      icon: DollarSign,
      stats: "%150",
      statLabel: "Ortalama Gelir Artışı",
    },
    {
      title: "Kolay Yönetim",
      description:
        "Tek bir platformdan tüm işlerinizi yönetin. Teklif gönderin, müşterilerle iletişime geçin, işleri takip edin ve ödemeleri alın.",
      icon: BarChart3,
      stats: "7/24",
      statLabel: "Platform Erişimi",
    },
    {
      title: "Güvenli Ödeme",
      description:
        "Hizmetgo Güvenli Ödeme sistemi ile ödemeleriniz korunur. İş tamamlandıktan sonra ödemenizi güvenle alın.",
      icon: Shield,
      stats: "100%",
      statLabel: "Güvenli Ödeme",
    },
  ];

  const features = [
    {
      title: "Kolay Profil Oluşturma",
      description:
        "Birkaç dakika içinde profilinizi oluşturun. Hizmetlerinizi, deneyiminizi, sertifikalarınızı ve önceki iş örneklerinizi ekleyin. Profesyonel bir görünüm kazanın ve müşterilerin dikkatini çekin.",
      icon: Target,
    },
    {
      title: "Akıllı İş Eşleştirme",
      description:
        "Size uygun işler otomatik olarak eşleştirilir. Bölgenizdeki, uzmanlık alanınızdaki ve çalışma saatlerinize uygun işleri görüntüleyin. Zamanınızı verimli kullanın.",
      icon: Zap,
    },
    {
      title: "Müşteri Yorumları ve Puanlar",
      description:
        "Tamamladığınız işlerden sonra müşterilerden aldığınız yorumlar ve puanlar profilinizde görünür. Yüksek puanlar daha fazla iş demektir.",
      icon: Star,
    },
    {
      title: "Esnek Çalışma Saatleri",
      description:
        "Kendi çalışma saatlerinizi belirleyin. Müsait olduğunuz zamanları işaretleyin, size uygun işleri seçin. İş-yaşam dengesini koruyun.",
      icon: Calendar,
    },
    {
      title: "Mobil Uygulama",
      description:
        "iOS ve Android uygulamalarımızla işlerinizi her yerden yönetin. Yeni iş bildirimleri alın, müşterilerle iletişime geçin ve işlerinizi takip edin.",
      icon: Smartphone,
    },
    {
      title: "Detaylı Analitik",
      description:
        "İş performansınızı takip edin. Görüntülenme sayıları, teklif gönderme oranları, kabul edilen işler ve gelir istatistiklerinizi görüntüleyin.",
      icon: BarChart3,
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Kayıt Olun",
      description:
        "Ücretsiz hesap oluşturun. İşletme bilgilerinizi, hizmet alanlarınızı ve deneyiminizi ekleyin. Profilinizi tamamlayın ve onay bekleyin.",
    },
    {
      step: 2,
      title: "Profilinizi Oluşturun",
      description:
        "Hizmetlerinizi, sertifikalarınızı, önceki iş örneklerinizi ve çalışma saatlerinizi ekleyin. Profesyonel fotoğraflar ve açıklamalarla profilinizi zenginleştirin.",
    },
    {
      step: 3,
      title: "İş Teklifleri Alın",
      description:
        "Size uygun iş taleplerini görüntüleyin. Detayları inceleyin, müşteri bilgilerini okuyun ve teklif gönderin. En uygun işleri seçin.",
    },
    {
      step: 4,
      title: "İşleri Tamamlayın",
      description:
        "Kabul edilen teklifleriniz için işleri zamanında ve kaliteli bir şekilde tamamlayın. Müşterilerle iletişimde kalın ve memnuniyet sağlayın.",
    },
    {
      step: 5,
      title: "Ödeme Alın ve Değerlendirme Toplayın",
      description:
        "İş tamamlandıktan sonra ödemenizi güvenle alın. Müşterilerden yorum ve puan alın, profilinizi güçlendirin ve daha fazla iş kazanın.",
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-500 via-brand-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              İşinizi Büyütün, Daha Fazla Müşteri Bulun
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Hizmetgo ile binlerce müşteriye ulaşın. Profesyonel esnaflar için
              tasarlanmış platform ile işinizi dijitalleştirin ve gelirinizi
              artırın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/business/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-lg"
              >
                Ücretsiz Kayıt Ol
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                Nasıl Çalışır?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* İstatistikler */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">
                10.000+
              </div>
              <div className="text-slate-600 font-medium">Aktif Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">
                5.000+
              </div>
              <div className="text-slate-600 font-medium">Kayıtlı Esnaf</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">
                50.000+
              </div>
              <div className="text-slate-600 font-medium">Tamamlanan İş</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">
                4.8
              </div>
              <div className="text-slate-600 font-medium">Ortalama Puan</div>
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Hizmetgo'nun Esnaflara Sunduğu Avantajlar
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Platformumuz, esnafların işlerini büyütmeleri ve daha fazla
              müşteri bulmaları için tasarlanmıştır. İşte size sunduğumuz
              avantajlar:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-3xl font-bold text-brand-600 mb-1">
                    {benefit.stats}
                  </div>
                  <div className="text-sm text-slate-500 mb-4">
                    {benefit.statLabel}
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

        {/* Özellikler */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Platform Özellikleri
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Hizmetgo, işinizi kolaylaştırmak ve büyütmek için güçlü özellikler
              sunar.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
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

        {/* Nasıl Çalışır */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Hizmetgo'ya katılmak ve işinizi büyütmek için 5 basit adım.
            </p>
          </div>
          <div className="space-y-8">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fiyatlandırma */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Şeffaf ve Adil Fiyatlandırma
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Hizmetgo'da kayıt tamamen ücretsizdir. Sadece başarılı işlerden
              küçük bir komisyon alırız. İş yoksa, ücret yok.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-brand-50 to-emerald-50 rounded-2xl p-8 md:p-12 border-2 border-brand-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500 mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  Ücretsiz Kayıt
                </h3>
                <p className="text-xl text-slate-600">
                  Sadece başarılı işlerden komisyon
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <h4 className="text-xl font-bold text-slate-900">
                      Ücretsiz Özellikler
                    </h4>
                  </div>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600 mt-1">✓</span>
                      <span>Profil oluşturma ve yönetimi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600 mt-1">✓</span>
                      <span>Sınırsız iş görüntüleme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600 mt-1">✓</span>
                      <span>Sınırsız teklif gönderme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600 mt-1">✓</span>
                      <span>Müşteri iletişim araçları</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600 mt-1">✓</span>
                      <span>İş yönetim paneli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600 mt-1">✓</span>
                      <span>Temel analitik ve raporlar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-600 mt-1">✓</span>
                      <span>Mobil uygulama erişimi</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-brand-600" />
                    <h4 className="text-xl font-bold text-slate-900">
                      Komisyon Yapısı
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-sm text-slate-600 mb-2">
                        Başarılı işlerden
                      </div>
                      <div className="text-2xl font-bold text-brand-600">
                        %10-15
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        İş tutarına göre değişir
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-1">•</span>
                        <span>İş kabul edilmediyse komisyon yok</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-1">•</span>
                        <span>Ödeme iş tamamlandıktan sonra</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-600 mt-1">•</span>
                        <span>Şeffaf fiyatlandırma, gizli ücret yok</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-900 font-medium mb-1">
                      <strong>Önemli:</strong> Komisyon sadece başarılı işlerden alınır
                    </p>
                    <p className="text-sm text-blue-800">
                      İş kabul edilmediyse veya iş tamamlanmadıysa hiçbir ücret
                      ödemezsiniz. Platform kullanımı, profil oluşturma ve teklif
                      gönderme tamamen ücretsizdir. Sadece müşteriyle anlaşıp işi
                      tamamladığınızda küçük bir komisyon alırız.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/business/register"
                  className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-600 transition-colors text-lg"
                >
                  Ücretsiz Kayıt Ol
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Başarı Hikayeleri */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-brand-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="text-center mb-8">
              <Award className="w-12 h-12 text-brand-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Başarı Hikayeleri
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Hizmetgo ile işlerini büyüten esnaflarımızın hikayeleri.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  "Hizmetgo sayesinde aylık gelirimi 3 katına çıkardım. Artık
                  müşteri aramama gerek yok, müşteriler beni buluyor."
                </p>
                <div className="font-semibold text-slate-900">
                  Mehmet Y., Elektrikçi
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  "Platform çok kullanıcı dostu. İşlerimi kolayca yönetiyorum ve
                  müşterilerle iletişim kurmak çok pratik."
                </p>
                <div className="font-semibold text-slate-900">
                  Ayşe K., Temizlik Uzmanı
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  "Güvenli ödeme sistemi sayesinde ödemelerimi zamanında alıyorum.
                  İşlerimi planlamak ve takip etmek çok kolay."
                </p>
                <div className="font-semibold text-slate-900">
                  Ali D., Boyacı
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Hizmetgo'ya ücretsiz kayıt olun, profilinizi oluşturun ve yeni
            müşteriler bulmaya başlayın. İlk işinizi almak için sadece birkaç
            dakika yeterli.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/business/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-lg"
            >
              Ücretsiz Kayıt Ol
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/support/help"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-lg"
            >
              Destek Al
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

