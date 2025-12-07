import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
  Video,
  Home,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kaynak Merkezi | Hizmetgo - Kapsamlı Rehberler ve Kaynaklar",
  description:
    "Hizmetgo'yu en iyi şekilde kullanmak için kapsamlı rehberler, makaleler, SSS ve eğitim kaynakları. Ev hizmetleri, esnaf seçimi ve proje yönetimi hakkında her şey.",
  keywords: [
    "hizmetgo kaynak merkezi",
    "hizmet rehberi",
    "esnaf seçimi",
    "ev hizmetleri rehberi",
    "proje yönetimi",
  ],
};

export default function ResourcesPage() {
  const guides = [
    {
      title: "Hizmetgo'yu Kullanmaya Başlama",
      description:
        "Hizmetgo platformunu kullanmaya başlamak için adım adım rehber. Hesap oluşturma, hizmet arama, teklif alma ve esnaf seçimi süreçlerini detaylıca öğrenin.",
      icon: BookOpen,
      href: "/how-it-works",
      topics: [
        "Hesap oluşturma ve profil ayarları",
        "Hizmet arama teknikleri",
        "Teklif alma ve karşılaştırma",
        "Esnaf seçimi kriterleri",
        "İletişim ve iş takibi",
      ],
    },
    {
      title: "Ev Hizmetleri Rehberi",
      description:
        "Evinizdeki her türlü hizmet ihtiyacı için kapsamlı rehber. Elektrik, tesisat, temizlik, boya badana ve daha fazlası hakkında detaylı bilgiler.",
      icon: Home,
      href: "/guides/home-services",
      topics: [
        "Elektrik işleri ve güvenlik",
        "Tesisat ve su tesisatı",
        "Temizlik ve bakım",
        "Boya badana ve dekorasyon",
        "Nakliyat ve taşıma",
      ],
    },
    {
      title: "Esnaf Seçimi ve Değerlendirme",
      description:
        "Doğru esnafı seçmek için kapsamlı rehber. Puan, yorum, deneyim ve fiyat faktörlerini nasıl değerlendireceğinizi öğrenin.",
      icon: Star,
      href: "/guides/choosing-pros",
      topics: [
        "Puan ve yorumları okuma",
        "Deneyim ve sertifikalar",
        "Fiyat karşılaştırması",
        "Referans kontrolü",
        "Güvenlik ve sigorta",
      ],
    },
    {
      title: "Proje Yönetimi ve İletişim",
      description:
        "Hizmet projelerinizi başarıyla yönetmek için ipuçları. Esnaflarla iletişim, zamanlama, bütçe yönetimi ve sorun çözme.",
      icon: TrendingUp,
      href: "/guides/project-management",
      topics: [
        "Etkili iletişim teknikleri",
        "Zamanlama ve planlama",
        "Bütçe yönetimi",
        "Sorun çözme stratejileri",
        "Proje tamamlama ve değerlendirme",
      ],
    },
  ];

  const articles = [
    {
      title: "Ev Temizliği İçin En İyi Zamanlama",
      description:
        "Ev temizliği hizmeti alırken dikkat edilmesi gerekenler, en uygun zamanlama ve temizlik türleri hakkında detaylı bilgiler.",
      category: "Temizlik",
      readTime: "5 dk",
    },
    {
      title: "Elektrik İşlerinde Güvenlik Rehberi",
      description:
        "Elektrik işleri yaptırırken güvenlik önlemleri, sertifikalı elektrikçi seçimi ve iş sonrası kontrol listesi.",
      category: "Elektrik",
      readTime: "7 dk",
    },
    {
      title: "Boya Badana Öncesi Hazırlık Süreci",
      description:
        "Boya badana işi yaptırmadan önce yapılması gerekenler, malzeme seçimi ve iş süreci hakkında kapsamlı rehber.",
      category: "Boya Badana",
      readTime: "6 dk",
    },
    {
      title: "Nakliyat İşlemlerinde Dikkat Edilmesi Gerekenler",
      description:
        "Eşya taşıma ve nakliyat işlemlerinde güvenli taşıma, sigorta ve hasar durumları hakkında bilgiler.",
      category: "Nakliyat",
      readTime: "8 dk",
    },
  ];

  const faqs = [
    {
      question: "Hizmetgo'da nasıl hizmet arayabilirim?",
      answer:
        "Hizmetgo'da hizmet aramak için birkaç yöntem bulunmaktadır. Ana sayfadaki arama çubuğuna ihtiyacınızı yazabilir, kategori çubuğundan doğrudan kategori seçebilir veya harita üzerinden yakınınızdaki esnafları bulabilirsiniz. Arama yaparken mümkün olduğunca detaylı açıklama yazmanız, size daha uygun teklifler almanızı sağlar.",
    },
    {
      question: "Teklif almak ücretsiz mi?",
      answer:
        "Evet, Hizmetgo'da teklif almak tamamen ücretsizdir. Platform üzerinden hizmet arama, esnaf görüntüleme, teklif alma ve karşılaştırma işlemleri için hiçbir ücret ödemezsiniz. Sadece seçtiğiniz esnafa iş karşılığında ödeme yaparsınız.",
    },
    {
      question: "Esnaf seçerken nelere dikkat etmeliyim?",
      answer:
        "Esnaf seçerken puan ve yorumları, deneyim yıllarını, sertifikaları, önceki iş örneklerini ve fiyat tekliflerini değerlendirmenizi öneririz. Ayrıca en az 3-5 esnaftan teklif alarak karşılaştırma yapmanız, hem en uygun fiyatı bulmanızı hem de kaliteli hizmet almanızı sağlar.",
    },
    {
      question: "Hizmetgo Garantisi nedir?",
      answer:
        "Hizmetgo Garantisi, işiniz beklendiği gibi gitmezse veya esnaf işi tamamlamazsa size yardımcı olan bir güvence sistemidir. Sorun yaşadığınızda destek ekibimize ulaşabilir, çözüm bulmamıza yardımcı olabilirsiniz. Hizmetgo Güvenli Ödeme sistemi ile ödeme yaptıysanız, paranız iş tamamlanana kadar korunur.",
    },
    {
      question: "Nasıl güvenli ödeme yapabilirim?",
      answer:
        "Hizmetgo Güvenli Ödeme sistemi ile ödeme yaparak paranızı koruyabilirsiniz. Bu sistemde ödeme, iş tamamlanana kadar platformda tutulur. İş beklendiği gibi tamamlanırsa ödeme esnafa aktarılır. Sorun yaşarsanız ödeme iade edilir. Ayrıca nakit veya havale ile de ödeme yapabilirsiniz, ancak bu durumda iş tamamlandıktan sonra ödeme yapmanızı öneririz.",
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
              Kaynak Merkezi
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmetgo'yu en iyi şekilde kullanmak için kapsamlı rehberler,
              makaleler ve kaynaklar. Ev hizmetlerinden proje yönetimine kadar
              her şey burada.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Kılavuzlar Bölümü */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Kapsamlı Kılavuzlar
            </h2>
          </div>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Hizmetgo platformunu etkili bir şekilde kullanmak, doğru esnafı
            seçmek ve projelerinizi başarıyla yönetmek için detaylı kılavuzlarımızı
            inceleyin. Her kılavuz, adım adım talimatlar, ipuçları ve en iyi
            uygulamalar içerir.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={index}
                  href={guide.href}
                  className="block group"
                >
                  <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-brand-300 transition-all h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                          <Icon className="w-6 h-6 text-brand-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {guide.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {guide.topics.map((topic, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-700"
                            >
                              <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2 text-brand-600 font-semibold group-hover:gap-3 transition-all">
                          <span>Kılavuzu Oku</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Makaleler Bölümü */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Yararlı Makaleler
            </h2>
          </div>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Ev hizmetleri, esnaf seçimi, proje yönetimi ve daha fazlası hakkında
            uzman yazılarımızı okuyun. Her makale, pratik ipuçları, gerçek
            örnekler ve uygulanabilir stratejiler içerir.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold mb-3">
                      <span>{article.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {article.title}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} okuma süresi</span>
                  </div>
                  <Link
                    href={`/articles/${article.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1"
                  >
                    Devamını Oku
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sık Sorulan Sorular */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Sık Sorulan Sorular
            </h2>
          </div>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Hizmetgo hakkında en çok sorulan sorular ve detaylı cevapları. Sorunuzun
            cevabını bulamazsanız, destek ekibimizle iletişime geçebilirsiniz.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-1" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-slate-700 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hızlı Bağlantılar */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Hızlı Bağlantılar
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/how-it-works"
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-brand-300 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-6 h-6 text-brand-600" />
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  Nasıl Kullanılır?
                </h3>
              </div>
              <p className="text-slate-600 text-sm">
                Hizmetgo'yu kullanmaya başlamak için adım adım rehber
              </p>
            </Link>

            <Link
              href="/pricing"
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-brand-300 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-brand-600" />
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  Fiyat Tahminleri
                </h3>
              </div>
              <p className="text-slate-600 text-sm">
                Kategori bazlı fiyat aralıkları ve uygun fiyat garantisi
              </p>
            </Link>

            <Link
              href="/support/help"
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-brand-300 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-brand-600" />
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  Destek Merkezi
                </h3>
              </div>
              <p className="text-slate-600 text-sm">
                Yardıma mı ihtiyacınız var? Destek ekibimizle iletişime geçin
              </p>
            </Link>
          </div>
        </section>

        {/* İletişim Bölümü */}
        <section className="bg-gradient-to-br from-brand-50 to-slate-50 rounded-2xl p-8 md:p-12 border border-brand-200">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
            Yardıma mı İhtiyacınız Var?
          </h2>
          <p className="text-lg text-slate-600 mb-8 text-center max-w-2xl mx-auto">
            Sorularınız için destek ekibimizle iletişime geçebilirsiniz. Size
            yardımcı olmaktan mutluluk duyarız.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              E-posta ile İletişim
            </Link>
            <Link
              href="/support/help"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-600 text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-brand-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Destek Merkezi
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

