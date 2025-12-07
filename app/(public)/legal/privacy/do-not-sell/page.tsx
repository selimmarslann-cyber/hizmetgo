import { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Mail,
  Phone,
  Shield,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kişisel Bilgilerimi Satma veya Paylaşma | Hizmetgo",
  description:
    "Hizmetgo kişisel bilgilerinizi satmaz. Kişisel verilerinizin paylaşımı ve tercihlerinizi yönetme hakkında bilgi.",
  keywords: [
    "kişisel bilgi satışı",
    "veri paylaşımı",
    "gizlilik tercihleri",
    "KVKK",
  ],
};

export default function DoNotSellPage() {
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
              Kişisel Bilgilerimi Satma veya Paylaşma
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmetgo, kişisel bilgilerinizi asla satmaz. Bu sayfa, verilerinizin
              nasıl korunduğunu ve tercihlerinizi nasıl yönetebileceğinizi açıklar.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Önemli Açıklama */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Kişisel Bilgileriniz Satılmaz
              </h3>
              <p className="text-green-800 leading-relaxed">
                Hizmetgo olarak, kişisel bilgilerinizi hiçbir zaman üçüncü
                taraflara satmayız veya pazarlama amaçlı kullanım için kiralamayız.
                Verileriniz yalnızca hizmet sunumu ve yasal yükümlülükler için
                kullanılır.
              </p>
            </div>
          </div>
        </div>

        {/* Bölümler */}
        <div className="space-y-12 prose prose-slate max-w-none">
          {/* 1. Kişisel Bilgilerin Satılmaması */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              1. Kişisel Bilgileriniz Satılmaz
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Hizmetgo, kişisel bilgilerinizi hiçbir zaman üçüncü taraflara
                satmaz, kiralamaz veya ticari amaçlarla paylaşmaz. Bu, bizim
                temel gizlilik prensibimizdir.
              </p>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Ne Yapmıyoruz:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Kişisel bilgilerinizi üçüncü taraflara satmayız</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Verilerinizi pazarlama amaçlı kullanım için kiralamayız
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Verilerinizi veri brokerlarına veya veri toplayıcılarına
                      satmayız
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Kişisel bilgilerinizi reklam amaçlı kullanım için
                      paylaşmayız
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Veri Paylaşımı */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              2. Veri Paylaşımı
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Kişisel verileriniz, yalnızca aşağıdaki sınırlı durumlarda ve
                güvenli şekilde paylaşılır:
              </p>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Sınırlı Paylaşım Durumları:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Hizmet Sağlayıcılar:</strong> Platform
                      hizmetlerinin sunulması için gerekli güvenilir üçüncü taraf
                      hizmet sağlayıcıları (ödeme işleme, bulut depolama vb.)
                      ile sınırlı ve güvenli şekilde
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Yasal Zorunluluklar:</strong> Yasal düzenlemeler
                      gereği mahkeme kararları, kamu kurumları talepleri
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Güvenlik:</strong> Güvenlik, dolandırıcılık önleme
                      ve yasal uyumluluk için gerekli durumlar
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Açık Rıza:</strong> Açık rıza verdiğiniz durumlar
                      (örneğin, belirli pazarlama faaliyetleri)
                    </div>
                  </li>
                </ul>
              </div>
              <p>
                <strong>Önemli:</strong> Tüm paylaşımlar, KVKK ve diğer yasal
                düzenlemelere uygun şekilde yapılır ve verileriniz güvenli
                kanallar üzerinden aktarılır.
              </p>
            </div>
          </section>

          {/* 3. Tercihlerinizi Yönetme */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              3. Tercihlerinizi Yönetme
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Kişisel verilerinizin kullanımı ve paylaşımı konusunda tercihlerinizi
                yönetebilirsiniz:
              </p>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Yönetebileceğiniz Tercihler:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Lock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Pazarlama İletişimleri:</strong> E-posta, SMS ve
                      push bildirimleri için pazarlama izinlerinizi yönetebilirsiniz
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Çerez Tercihleri:</strong> Çerez kullanımı
                      tercihlerinizi yönetebilirsiniz
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Veri Paylaşımı:</strong> Belirli veri paylaşımı
                      tercihlerinizi yönetebilirsiniz (açık rıza gerektiren
                      durumlar için)
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-brand-50 rounded-lg p-6 border border-brand-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Tercihlerinizi Nasıl Yönetirsiniz?
                </h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Hesap Ayarları:</strong> Hesabınıza giriş yaparak
                    &quot;Ayarlar&quot; bölümünden tercihlerinizi yönetebilirsiniz
                  </li>
                  <li>
                    <strong>E-posta Bildirimleri:</strong> E-postalarımızdaki
                    &quot;Abonelikten Çık&quot; linklerini kullanabilirsiniz
                  </li>
                  <li>
                    <strong>Destek Merkezi:</strong>{" "}
                    <Link
                      href="/support/help"
                      className="text-brand-600 hover:text-brand-700 underline"
                    >
                      Destek merkezimiz
                    </Link>{" "}
                    üzerinden başvurabilirsiniz
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. KVKK Haklarınız */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              4. KVKK Kapsamındaki Haklarınız
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında
                aşağıdaki haklara sahipsiniz:
              </p>
              <div className="bg-brand-50 rounded-lg p-6 border border-brand-200">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>İşlenen verilerinize erişim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Verilerinizin düzeltilmesini isteme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Verilerinizin silinmesini isteme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Veri işlemeye itiraz etme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Verilerinizin aktarıldığı üçüncü kişileri bilme</span>
                  </li>
                </ul>
              </div>
              <p>
                Detaylı bilgi için{" "}
                <Link
                  href="/legal/kvkk"
                  className="text-brand-600 hover:text-brand-700 underline"
                >
                  KVKK Aydınlatma Metnimizi
                </Link>{" "}
                inceleyebilirsiniz.
              </p>
            </div>
          </section>

          {/* 5. Veri Güvenliği */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              5. Veri Güvenliği
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Kişisel verilerinizin güvenliği bizim önceliğimizdir. Verilerinizi
                korumak için aşağıdaki tedbirleri alıyoruz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>256-bit SSL şifreleme</li>
                <li>Güvenli sunucu altyapısı</li>
                <li>Düzenli güvenlik denetimleri</li>
                <li>Erişim kontrolü ve yetkilendirme</li>
                <li>Veri yedekleme ve kurtarma sistemleri</li>
                <li>Güvenlik açığı taramaları</li>
              </ul>
              <p>
                Detaylı bilgi için{" "}
                <Link
                  href="/safety"
                  className="text-brand-600 hover:text-brand-700 underline"
                >
                  Güvenlik sayfamızı
                </Link>{" "}
                ziyaret edebilirsiniz.
              </p>
            </div>
          </section>

          {/* 6. İletişim */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              6. Sorularınız ve Başvurularınız
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Kişisel verilerinizin satışı, paylaşımı veya kullanımı ile ilgili
                sorularınız için aşağıdaki iletişim kanallarını kullanabilirsiniz:
              </p>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>E-posta:</strong>{" "}
                      <a
                        href="mailto:kvkk@hizmetgo.app"
                        className="text-brand-600 hover:text-brand-700 underline"
                      >
                        kvkk@hizmetgo.app
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Telefon:</strong>{" "}
                      <a
                        href="tel:+905551234567"
                        className="text-brand-600 hover:text-brand-700 underline"
                      >
                        +90 (555) 123 45 67
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Destek Merkezi:</strong>{" "}
                      <Link
                        href="/support/help"
                        className="text-brand-600 hover:text-brand-700 underline"
                      >
                        /support/help
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
              <p>
                <strong>Başvuru Süresi:</strong> Başvurularınız, en geç 30 (otuz)
                gün içinde sonuçlandırılır ve size bildirilir.
              </p>
            </div>
          </section>
        </div>

        {/* Özet Kutu */}
        <div className="mt-12 bg-gradient-to-br from-brand-50 to-white rounded-xl p-8 border-2 border-brand-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Özet
          </h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Kişisel bilgileriniz asla satılmaz</strong> - Bu bizim
                temel prensibimizdir
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Verileriniz yalnızca hizmet sunumu için kullanılır</strong>{" "}
                - Yasal zorunluluklar ve güvenlik dışında paylaşım yapılmaz
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Tercihlerinizi yönetebilirsiniz</strong> - Hesap
                ayarlarınızdan veya destek merkezimizden
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>KVKK haklarınız korunur</strong> - Tüm haklarınızı
                kullanabilirsiniz
              </span>
            </li>
          </ul>
        </div>

        {/* İlgili Bağlantılar */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Link
            href="/legal/privacy"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <Shield className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              Gizlilik Politikası
            </h3>
            <p className="text-slate-600 text-sm">
              Detaylı gizlilik politikamızı inceleyin
            </p>
          </Link>
          <Link
            href="/legal/kvkk"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <FileText className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              KVKK Aydınlatma Metni
            </h3>
            <p className="text-slate-600 text-sm">
              KVKK kapsamında detaylı bilgi
            </p>
          </Link>
          <Link
            href="/safety"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <Shield className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              Güvenlik
            </h3>
            <p className="text-slate-600 text-sm">
              Güvenlik özelliklerimiz hakkında bilgi
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

