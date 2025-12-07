import { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code,
  FileText,
  Globe,
  Key,
  Lock,
  Mail,
  Shield,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Geliştiriciler İçin | Hizmetgo API",
  description:
    "Hizmetgo API ile entegrasyon yapın. API dokümantasyonu, örnek kodlar ve geliştirici kaynakları.",
  keywords: [
    "API",
    "geliştirici",
    "dokümantasyon",
    "entegrasyon",
    "Hizmetgo API",
  ],
};

export default function DevelopersPage() {
  const features = [
    {
      title: "RESTful API",
      description:
        "Modern RESTful API mimarisi ile kolay entegrasyon. JSON formatında veri alışverişi.",
      icon: Globe,
    },
    {
      title: "Güvenli Kimlik Doğrulama",
      description:
        "API anahtarı ile güvenli kimlik doğrulama. OAuth 2.0 desteği yakında.",
      icon: Lock,
    },
    {
      title: "Kapsamlı Dokümantasyon",
      description:
        "Detaylı API dokümantasyonu, örnek kodlar ve entegrasyon rehberleri.",
      icon: BookOpen,
    },
    {
      title: "Hızlı ve Güvenilir",
      description:
        "Yüksek performanslı API altyapısı ile hızlı yanıt süreleri ve %99.9 uptime garantisi.",
      icon: Zap,
    },
  ];

  const useCases = [
    {
      title: "Hizmet Arama Entegrasyonu",
      description:
        "Uygulamanıza Hizmetgo hizmet arama özelliğini entegre edin. Kullanıcılarınız doğrudan uygulamanızdan hizmet arayabilir.",
      icon: Code,
    },
    {
      title: "Esnaf Yönetim Sistemi",
      description:
        "Esnaflar için özel yönetim paneli oluşturun. Sipariş yönetimi, müşteri iletişimi ve daha fazlası.",
      icon: Users,
    },
    {
      title: "Ödeme Entegrasyonu",
      description:
        "Güvenli ödeme işlemlerini uygulamanıza entegre edin. Hizmetgo ödeme altyapısını kullanın.",
      icon: Shield,
    },
    {
      title: "Bildirim Sistemi",
      description:
        "Gerçek zamanlı bildirimler gönderin. Sipariş durumu, mesajlar ve önemli güncellemeler.",
      icon: Zap,
    },
  ];

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/services",
      description: "Hizmet listesini getirir",
    },
    {
      method: "GET",
      endpoint: "/api/v1/services/{id}",
      description: "Belirli bir hizmetin detaylarını getirir",
    },
    {
      method: "POST",
      endpoint: "/api/v1/orders",
      description: "Yeni sipariş oluşturur",
    },
    {
      method: "GET",
      endpoint: "/api/v1/orders",
      description: "Sipariş listesini getirir",
    },
    {
      method: "GET",
      endpoint: "/api/v1/businesses",
      description: "Esnaf listesini getirir",
    },
    {
      method: "POST",
      endpoint: "/api/v1/businesses",
      description: "Yeni esnaf kaydı oluşturur",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Code className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Geliştiriciler İçin
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmetgo API ile uygulamanızı entegre edin. Güçlü, güvenli ve
              kolay kullanımlı API ile yeni özellikler geliştirin.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Önemli Bilgi */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                API Erişimi
              </h3>
              <p className="text-blue-800 leading-relaxed">
                Hizmetgo API&apos;ye erişim için API anahtarı gereklidir. API
                anahtarı almak için aşağıdaki formu doldurun. Başvurunuz
                incelendikten sonra API anahtarınız size iletilecektir.
              </p>
            </div>
          </div>
        </div>

        {/* API Özellikleri */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            API Özellikleri
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
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

        {/* API Anahtarı Talep Formu */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-8 h-8 text-brand-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                API Anahtarı Talep Et
              </h2>
            </div>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              API anahtarı almak için aşağıdaki formu doldurun. Başvurunuz
              incelendikten sonra API anahtarınız size e-posta ile iletilecektir.
            </p>
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      E-posta <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Şirket/Organizasyon
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Şirket veya organizasyon adı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    API Kullanım Amacı <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 min-h-[120px]"
                    placeholder="API'yi hangi amaçla kullanacağınızı açıklayın..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Beklenen API Çağrı Hacmi
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500">
                    <option>Günde 1-100 çağrı</option>
                    <option>Günde 100-1.000 çağrı</option>
                    <option>Günde 1.000-10.000 çağrı</option>
                    <option>Günde 10.000+ çağrı</option>
                  </select>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-slate-700">
                    <Link
                      href="/legal/terms"
                      className="text-brand-600 hover:text-brand-700 underline"
                    >
                      Kullanım Şartları
                    </Link>{" "}
                    ve{" "}
                    <Link
                      href="/legal/privacy"
                      className="text-brand-600 hover:text-brand-700 underline"
                    >
                      Gizlilik Politikası
                    </Link>{" "}
                    &apos;nı okudum ve kabul ediyorum. <span className="text-red-500">*</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-brand-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-600 transition-colors text-lg inline-flex items-center justify-center gap-2"
                >
                  API Anahtarı Talep Et
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Kullanım Senaryoları */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Kullanım Senaryoları
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* API Endpoint'leri */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            API Endpoint&apos;leri
          </h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-6 leading-relaxed">
              Hizmetgo API, RESTful mimari kullanır. Tüm endpoint&apos;ler JSON
              formatında veri döndürür. Detaylı dokümantasyon için API anahtarınızı
              aldıktan sonra erişebilirsiniz.
            </p>
            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-slate-200"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-md text-sm font-semibold ${
                        endpoint.method === "GET"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="flex-1 text-sm font-mono text-slate-900">
                      {endpoint.endpoint}
                    </code>
                    <span className="text-sm text-slate-600">
                      {endpoint.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Dokümantasyonu */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-brand-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-brand-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                API Dokümantasyonu
              </h2>
            </div>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Detaylı API dokümantasyonu, örnek kodlar ve entegrasyon rehberleri
              için API anahtarınızı aldıktan sonra geliştirici portaluna erişebilirsiniz.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <FileText className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  API Referansı
                </h3>
                <p className="text-slate-600 text-sm">
                  Tüm endpoint&apos;ler, parametreler ve yanıt formatları
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <Terminal className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Örnek Kodlar
                </h3>
                <p className="text-slate-600 text-sm">
                  Farklı programlama dilleri için örnek kodlar ve SDK&apos;lar
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <Zap className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Hızlı Başlangıç
                </h3>
                <p className="text-slate-600 text-sm">
                  İlk entegrasyonunuzu 5 dakikada yapın
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Güvenlik ve Limitler */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Güvenlik ve Limitler
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-brand-600" />
                <h3 className="text-xl font-bold text-slate-900">Güvenlik</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>HTTPS zorunludur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>API anahtarı ile kimlik doğrulama</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Rate limiting ile koruma</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>IP whitelist desteği</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-brand-600" />
                <h3 className="text-xl font-bold text-slate-900">Rate Limiting</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Dakikada 100 istek (varsayılan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Günde 10.000 istek (varsayılan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Yüksek hacim için özel limitler</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Limitler API anahtarına göre ayarlanır</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* İletişim */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              Sorularınız mı Var?
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center leading-relaxed">
              API ile ilgili sorularınız için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:api@hizmetgo.app"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-600 transition-colors text-lg"
              >
                <Mail className="w-5 h-5" />
                api@hizmetgo.app
              </a>
              <Link
                href="/support/help"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-500 text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-brand-50 transition-colors text-lg"
              >
                <Users className="w-5 h-5" />
                Destek Merkezi
              </Link>
            </div>
          </div>
        </section>

        {/* İlgili Bağlantılar */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/legal/terms"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <FileText className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              Kullanım Şartları
            </h3>
            <p className="text-slate-600 text-sm">
              API kullanım şartlarını öğrenin
            </p>
          </Link>
          <Link
            href="/legal/privacy"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <Shield className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              Gizlilik Politikası
            </h3>
            <p className="text-slate-600 text-sm">
              Veri koruma politikamızı inceleyin
            </p>
          </Link>
          <Link
            href="/about"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <Users className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              Hakkımızda
            </h3>
            <p className="text-slate-600 text-sm">
              Hizmetgo hakkında bilgi edinin
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

