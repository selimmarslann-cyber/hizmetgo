import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  MapPin,
  MessageSquare,
  Quote,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Esnaf Yorumları | Hizmetgo - Gerçek Deneyimler",
  description:
    "Hizmetgo esnaflarının gerçek deneyimlerini okuyun. Platform hakkında yorumlar, başarı hikayeleri ve geri bildirimler.",
  keywords: [
    "esnaf yorumları",
    "hizmetgo deneyimleri",
    "esnaf geri bildirimleri",
    "platform yorumları",
  ],
};

export default function ProReviewsPage() {
  const featuredReviews = [
    {
      name: "Mehmet Yılmaz",
      profession: "Elektrikçi",
      location: "İstanbul",
      rating: 5,
      date: "2 ay önce",
      title: "Aylık Gelirimi 3 Katına Çıkardım",
      review:
        "Hizmetgo sayesinde işimde büyük bir dönüşüm yaşadım. İlk 3 ayda 150'den fazla müşteri kazandım ve aylık gelirimi 15.000 TL'den 45.000 TL'ye çıkardım. Platform çok kullanıcı dostu ve müşteri bulmak gerçekten kolay.",
      stats: {
        jobs: "200+",
        rating: "4.9/5",
        revenue: "+200%",
      },
      verified: true,
    },
    {
      name: "Ayşe Kaya",
      profession: "Temizlik Uzmanı",
      location: "Ankara",
      rating: 5,
      date: "1 ay önce",
      title: "Müşteri Tabanımı Hızla Genişlettim",
      review:
        "6 ayda 200'den fazla başarılı iş yaptım. Hizmetgo'nun teklif sistemi sayesinde sürekli yeni müşteriler buluyorum. Özellikle profil optimizasyonu rehberleri çok işime yaradı. Müşteri yorumları da işimi büyütmeme çok yardımcı oldu.",
      stats: {
        jobs: "200+",
        rating: "5.0/5",
        revenue: "+180%",
      },
      verified: true,
    },
    {
      name: "Ali Demir",
      profession: "Tesisatçı",
      location: "İzmir",
      rating: 5,
      date: "3 ay önce",
      title: "5 Yıldızlı Profil Başarısı",
      review:
        "Müşteri yorumu stratejilerini uygulayarak 4.9 yıldız ortalamasına ulaştım. 150'den fazla pozitif yorum aldım ve bu sayede sürekli yeni işler geliyor. Platform'un müşteri iletişim araçları da çok pratik.",
      stats: {
        jobs: "180+",
        rating: "4.9/5",
        revenue: "+150%",
      },
      verified: true,
    },
  ];

  const categoryReviews = [
    {
      category: "Elektrikçiler",
      reviews: [
        {
          name: "Fatma Şahin",
          location: "Bursa",
          rating: 5,
          date: "1 hafta önce",
          review:
            "Hizmetgo ile çalışmaya başladığımdan beri işlerim %300 arttı. Müşteri bulmak artık çok kolay ve platform gerçekten profesyonel.",
          verified: true,
        },
        {
          name: "Mustafa Öz",
          location: "Antalya",
          rating: 5,
          date: "2 hafta önce",
          review:
            "İlk ay 30 müşteri kazandım. Platform'un teklif sistemi ve müşteri yorumları özellikleri harika. Kesinlikle tavsiye ederim.",
          verified: true,
        },
      ],
    },
    {
      category: "Temizlik Uzmanları",
      reviews: [
        {
          name: "Zeynep Arslan",
          location: "İstanbul",
          rating: 5,
          date: "3 gün önce",
          review:
            "6 ayda 150'den fazla düzenli müşteri edindim. Hizmetgo sayesinde işimi büyüttüm ve gelirimi artırdım. Müşteri iletişimi çok kolay.",
          verified: true,
        },
        {
          name: "Emre Yıldız",
          location: "Ankara",
          rating: 4,
          date: "1 hafta önce",
          review:
            "Platform genel olarak iyi ama bazen müşteri bulmak biraz zaman alıyor. Yine de diğer platformlara göre çok daha iyi.",
          verified: true,
        },
      ],
    },
    {
      category: "Tesisatçılar",
      reviews: [
        {
          name: "Hasan Kılıç",
          location: "İzmir",
          rating: 5,
          date: "5 gün önce",
          review:
            "Hizmetgo ile çalışmak iş hayatımı değiştirdi. Sürekli yeni işler geliyor ve müşteri memnuniyeti çok yüksek. Platform'un fiyatlandırma rehberleri de çok yardımcı oldu.",
          verified: true,
        },
        {
          name: "Gülay Çelik",
          location: "Adana",
          rating: 5,
          date: "2 hafta önce",
          review:
            "İlk 2 ayda 80 müşteri kazandım. Profil optimizasyonu ve müşteri yorumları sayesinde işlerim hızla büyüdü. Çok memnunum.",
          verified: true,
        },
      ],
    },
    {
      category: "Boya/Badana Ustaları",
      reviews: [
        {
          name: "Cemal Aydın",
          location: "İstanbul",
          rating: 5,
          date: "1 hafta önce",
          review:
            "Hizmetgo'nun pazarlama araçları sayesinde müşteri bulmak çok kolay. Özellikle profil fotoğrafı ve açıklama önerileri çok işime yaradı.",
          verified: true,
        },
        {
          name: "Selin Yılmaz",
          location: "Ankara",
          rating: 4,
          date: "3 gün önce",
          review:
            "Platform genel olarak iyi ama bazen teknik sorunlar yaşanıyor. Yine de müşteri bulmak için en iyi platformlardan biri.",
          verified: true,
        },
      ],
    },
  ];

  const stats = [
    {
      label: "Aktif Esnaf",
      value: "10.000+",
      icon: Users,
    },
    {
      label: "Ortalama Puan",
      value: "4.8/5",
      icon: Star,
    },
    {
      label: "Başarılı İş",
      value: "500.000+",
      icon: CheckCircle2,
    },
    {
      label: "Memnuniyet Oranı",
      value: "96%",
      icon: ThumbsUp,
    },
  ];

  const benefits = [
    {
      title: "Kolay Müşteri Bulma",
      description:
        "Binlerce aktif müşteri sizi arıyor. Teklif gönderin ve işleri kazanın.",
      icon: Users,
    },
    {
      title: "Güvenilir Platform",
      description:
        "Tüm ödemeler güvenli şekilde yapılır ve müşteri yorumları ile güven oluşturun.",
      icon: Award,
    },
    {
      title: "Gelir Artışı",
      description:
        "Ortalama esnaflarımız ilk 3 ayda gelirlerini %150 artırıyor.",
      icon: TrendingUp,
    },
    {
      title: "7/24 Destek",
      description:
        "Her zaman yanınızdayız. Sorularınız için destek ekibimiz hazır.",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Star className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Esnaf Yorumları
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmetgo esnaflarının gerçek deneyimlerini okuyun. Binlerce esnaf
              işlerini büyütmek için Hizmetgo'yu tercih ediyor.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* İstatistikler */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-100 mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Öne Çıkan Yorumlar */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Öne Çıkan Yorumlar
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-slate-900">{review.name}</h3>
                      {review.verified && (
                        <CheckCircle2 className="w-4 h-4 text-brand-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{review.profession}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span>{review.location}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    {review.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {review.review}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-brand-600">
                      {review.stats.jobs}
                    </div>
                    <div className="text-xs text-slate-500">İş</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-brand-600">
                      {review.stats.rating}
                    </div>
                    <div className="text-xs text-slate-500">Puan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-brand-600">
                      {review.stats.revenue}
                    </div>
                    <div className="text-xs text-slate-500">Artış</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kategorilere Göre Yorumlar */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Kategorilere Göre Yorumlar
          </h2>
          <div className="space-y-8">
            {categoryReviews.map((category, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.reviews.map((review, revIndex) => (
                    <div
                      key={revIndex}
                      className="border border-slate-200 rounded-lg p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-900">
                              {review.name}
                            </span>
                            {review.verified && (
                              <CheckCircle2 className="w-4 h-4 text-brand-600" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />
                            <span>{review.location}</span>
                            <span>•</span>
                            <Calendar className="w-3 h-3" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {review.review}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Avantajlar */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Neden Hizmetgo?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-brand-50 border border-slate-200 rounded-xl p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-100 mb-4">
                    <Icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Genel İstatistikler */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Hizmetgo'da Başarı İstatistikleri
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Binlerce esnaf Hizmetgo ile işlerini büyütüyor. Siz de
                katılın!
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">%150</div>
                <div className="text-white/90">
                  Ortalama gelir artışı (ilk 3 ay)
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">4.8/5</div>
                <div className="text-white/90">Ortalama esnaf memnuniyeti</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">96%</div>
                <div className="text-white/90">
                  Esnaflar platformu tavsiye ediyor
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-slate-50 to-brand-50 rounded-2xl p-8 md:p-12 border border-slate-200 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
            <Quote className="w-8 h-8 text-brand-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Siz de Başarı Hikayenizi Yazın
          </h2>
          <p className="text-xl mb-8 text-slate-600 max-w-2xl mx-auto">
            Binlerce esnaf gibi siz de Hizmetgo ile işinizi büyütün. Ücretsiz
            kayıt olun ve ilk müşterilerinizi kazanmaya başlayın.
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
              Esnaflar İçin Hizmetgo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

