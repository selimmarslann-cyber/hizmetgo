import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  DollarSign,
  Download,
  FileText,
  Lightbulb,
  MessageSquare,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  Zap,
  PlayCircle,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Esnaf Kaynakları | Hizmetgo - İşinizi Büyütün",
  description:
    "Hizmetgo esnaf kaynakları ile işinizi büyütün. Profil optimizasyonu, pazarlama ipuçları, fiyatlandırma rehberleri ve daha fazlası.",
  keywords: [
    "esnaf kaynakları",
    "iş geliştirme",
    "pazarlama ipuçları",
    "profil optimizasyonu",
    "müşteri kazanma",
  ],
};

export default function ProResourcesPage() {
  const resourceCategories = [
    {
      title: "Profil Optimizasyonu",
      description:
        "Profilinizi optimize ederek daha fazla müşteri çekin. Profil fotoğrafı, açıklama ve hizmetlerinizi nasıl düzenleyeceğinizi öğrenin.",
      icon: User,
      resources: [
        {
          title: "Mükemmel Profil Fotoğrafı Çekme Rehberi",
          type: "Rehber",
          readTime: "5 dk",
          icon: Camera,
        },
        {
          title: "Profil Açıklamanızı Yazma İpuçları",
          type: "İpucu",
          readTime: "3 dk",
          icon: FileText,
        },
        {
          title: "Hizmetlerinizi Nasıl Sunmalısınız?",
          type: "Rehber",
          readTime: "7 dk",
          icon: Target,
        },
      ],
    },
    {
      title: "Müşteri Kazanma",
      description:
        "Daha fazla teklif gönderin, daha fazla iş kazanın. Müşteri çekme stratejileri ve teklif gönderme ipuçları.",
      icon: Users,
      resources: [
        {
          title: "Teklif Gönderme En İyi Uygulamaları",
          type: "Rehber",
          readTime: "8 dk",
          icon: MessageSquare,
        },
        {
          title: "İlk Mesajınızı Nasıl Yazmalısınız?",
          type: "İpucu",
          readTime: "4 dk",
          icon: Lightbulb,
        },
        {
          title: "Müşteri İletişimi Stratejileri",
          type: "Rehber",
          readTime: "6 dk",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Fiyatlandırma Stratejileri",
      description:
        "Rekabetçi fiyatlar belirleyin ve gelirinizi artırın. Fiyatlandırma rehberleri ve pazar analizi.",
      icon: DollarSign,
      resources: [
        {
          title: "Fiyatlandırma Rehberi: Ne Kadar İsteyebilirsiniz?",
          type: "Rehber",
          readTime: "10 dk",
          icon: DollarSign,
        },
        {
          title: "Rekabetçi Fiyatlandırma İpuçları",
          type: "İpucu",
          readTime: "5 dk",
          icon: TrendingUp,
        },
        {
          title: "Gelir Artırma Stratejileri",
          type: "Rehber",
          readTime: "12 dk",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Müşteri Yorumları ve Değerlendirmeler",
      description:
        "Müşteri yorumlarını nasıl alacağınızı ve yöneteceğinizi öğrenin. Pozitif yorumlar işinizi büyütür.",
      icon: Star,
      resources: [
        {
          title: "Müşteri Yorumu İsteme Rehberi",
          type: "Rehber",
          readTime: "6 dk",
          icon: Star,
        },
        {
          title: "Olumsuz Yorumlara Nasıl Yanıt Verilir?",
          type: "Rehber",
          readTime: "7 dk",
          icon: MessageSquare,
        },
        {
          title: "5 Yıldızlı Profil Oluşturma",
          type: "İpucu",
          readTime: "5 dk",
          icon: Award,
        },
      ],
    },
    {
      title: "İş Geliştirme ve Büyüme",
      description:
        "İşinizi büyütmek için stratejiler ve araçlar. Müşteri tabanınızı genişletin ve gelirinizi artırın.",
      icon: TrendingUp,
      resources: [
        {
          title: "İlk 100 Müşteriyi Kazanma Stratejisi",
          type: "Rehber",
          readTime: "15 dk",
          icon: Target,
        },
        {
          title: "Müşteri Sadakati Oluşturma",
          type: "Rehber",
          readTime: "9 dk",
          icon: Users,
        },
        {
          title: "İşinizi Ölçeklendirme İpuçları",
          type: "Rehber",
          readTime: "11 dk",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "Pazarlama ve Tanıtım",
      description:
        "Kendinizi tanıtın ve daha fazla müşteriye ulaşın. Sosyal medya, yerel pazarlama ve daha fazlası.",
      icon: Zap,
      resources: [
        {
          title: "Sosyal Medya Pazarlama Rehberi",
          type: "Rehber",
          readTime: "12 dk",
          icon: Zap,
        },
        {
          title: "Yerel Pazarlama Stratejileri",
          type: "Rehber",
          readTime: "8 dk",
          icon: Target,
        },
        {
          title: "Referans Programı Nasıl Çalışır?",
          type: "İpucu",
          readTime: "5 dk",
          icon: Users,
        },
      ],
    },
  ];

  const featuredResources = [
    {
      title: "Başarılı Esnaf Olma Rehberi: İlk 30 Gün",
      description:
        "Hizmetgo'ya yeni kaydolan esnaflar için kapsamlı bir başlangıç rehberi. İlk müşterilerinizi nasıl kazanacağınızı öğrenin.",
      type: "Kapsamlı Rehber",
      readTime: "20 dk",
      icon: BookOpen,
      featured: true,
    },
    {
      title: "Profil Optimizasyonu: Adım Adım Rehber",
      description:
        "Profilinizi optimize ederek görünürlüğünüzü %300 artırın. Profesyonel fotoğraflar, etkili açıklamalar ve daha fazlası.",
      type: "Video Eğitimi",
      readTime: "15 dk",
      icon: Video,
      featured: true,
    },
    {
      title: "Fiyatlandırma Masterclass",
      description:
        "Rekabetçi fiyatlar belirleyin ve gelirinizi maksimize edin. Pazar analizi, maliyet hesaplama ve stratejik fiyatlandırma.",
      type: "Webinar",
      readTime: "45 dk",
      icon: PlayCircle,
      featured: true,
    },
  ];

  const toolsAndDownloads = [
    {
      title: "Profil Kontrol Listesi",
      description: "Profilinizi optimize etmek için kontrol listesi",
      icon: CheckCircle2,
      download: true,
    },
    {
      title: "Fiyatlandırma Hesaplayıcı",
      description: "Rekabetçi fiyatlar belirlemek için araç",
      icon: DollarSign,
      download: false,
    },
    {
      title: "Müşteri İletişim Şablonları",
      description: "Hazır mesaj şablonları ve örnekler",
      icon: MessageSquare,
      download: true,
    },
    {
      title: "İş Analiz Raporu Şablonu",
      description: "İş performansınızı takip etmek için şablon",
      icon: BarChart3,
      download: true,
    },
  ];

  const successStories = [
    {
      title: "Aylık Gelirimi 3 Katına Çıkardım",
      author: "Mehmet Y., Elektrikçi",
      description:
        "Hizmetgo kaynaklarını kullanarak profilimi optimize ettim ve müşteri sayımı artırdım.",
      stats: "Aylık gelir: 15.000 TL → 45.000 TL",
    },
    {
      title: "İlk 6 Ayda 200+ Müşteri",
      author: "Ayşe K., Temizlik Uzmanı",
      description:
        "Pazarlama rehberlerini takip ederek hızlı bir şekilde müşteri tabanı oluşturdum.",
      stats: "6 ayda 200+ başarılı iş",
    },
    {
      title: "5 Yıldızlı Profil Başarısı",
      author: "Ali D., Tesisatçı",
      description:
        "Müşteri yorumu stratejilerini uygulayarak 4.9 yıldız ortalamasına ulaştım.",
      stats: "4.9/5 yıldız, 150+ yorum",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <BookOpen className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Esnaf Kaynakları
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              İşinizi büyütmek, daha fazla müşteri kazanmak ve gelirinizi artırmak
              için ihtiyacınız olan tüm kaynaklar burada. Rehberler, ipuçları,
              araçlar ve daha fazlası.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Öne Çıkan Kaynaklar */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Öne Çıkan Kaynaklar
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={index}
                  href={`/pro-resources/${index + 1}`}
                  className="block group"
                >
                  <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-300 transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold mb-3">
                      {resource.type}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{resource.readTime} okuma süresi</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Kaynak Kategorileri */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Kategorilere Göre Kaynaklar
          </h2>
          <div className="space-y-8">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {category.resources.map((resource, resIndex) => {
                      const ResIcon = resource.icon;
                      return (
                        <Link
                          key={resIndex}
                          href={`/pro-resources/category/${index}/resource/${resIndex}`}
                          className="block group"
                        >
                          <div className="border border-slate-200 rounded-lg p-4 hover:border-brand-300 hover:shadow-sm transition-all">
                            <div className="flex items-start gap-3 mb-2">
                              <ResIcon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-brand-600">
                                    {resource.type}
                                  </span>
                                  <span className="text-xs text-slate-400">•</span>
                                  <span className="text-xs text-slate-500">
                                    {resource.readTime}
                                  </span>
                                </div>
                                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                                  {resource.title}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Araçlar ve İndirmeler */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Araçlar ve İndirmeler
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolsAndDownloads.map((tool, index) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <ToolIcon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {tool.description}
                  </p>
                  {tool.download ? (
                    <button className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-sm">
                      <Download className="w-4 h-4" />
                      İndir
                    </button>
                  ) : (
                    <button className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-sm">
                      Kullan
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Başarı Hikayeleri */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Başarı Hikayeleri
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-brand-50 border border-slate-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {story.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-sm font-semibold text-slate-700">
                    {story.author}
                  </span>
                  <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-md">
                    {story.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İstatistikler */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-white/90">Kaynak</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                <div className="text-white/90">Aktif Esnaf</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                <div className="text-white/90">Memnuniyet Oranı</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-white/90">Destek</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-slate-50 to-brand-50 rounded-2xl p-8 md:p-12 border border-slate-200 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-xl mb-8 text-slate-600 max-w-2xl mx-auto">
            Hizmetgo kaynaklarını kullanarak işinizi büyütün. Ücretsiz kayıt olun
            ve ilk müşterilerinizi kazanmaya başlayın.
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

