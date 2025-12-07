import { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Database,
  Eye,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Hizmetgo",
  description:
    "Hizmetgo gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı, saklandığı ve korunduğu hakkında bilgi.",
  keywords: [
    "gizlilik politikası",
    "kişisel veri koruma",
    "KVKK",
    "veri güvenliği",
    "gizlilik",
  ],
};

export default function PrivacyPage() {
  const lastUpdated = "1 Ocak 2025";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Lock className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Gizlilik Politikası
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Kişisel verilerinizin korunması bizim önceliğimiz. Bu politika,
              verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu
              açıklar.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              Son güncelleme: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Önemli Bilgi */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Önemli Bilgi
              </h3>
              <p className="text-blue-800 leading-relaxed">
                Bu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması
                Kanunu (KVKK) kapsamında hazırlanmıştır. Kişisel verilerinizin
                işlenmesi, saklanması ve korunması konusunda haklarınızı ve
                yükümlülüklerimizi açıklar.
              </p>
            </div>
          </div>
        </div>

        {/* İçindekiler */}
        <div className="bg-slate-50 rounded-xl p-6 mb-12 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">İçindekiler</h2>
          <ol className="space-y-2 text-slate-700">
            <li>
              <a href="#giris" className="hover:text-brand-600">
                1. Giriş
              </a>
            </li>
            <li>
              <a href="#veri-sorumlusu" className="hover:text-brand-600">
                2. Veri Sorumlusu
              </a>
            </li>
            <li>
              <a href="#toplanan-veriler" className="hover:text-brand-600">
                3. Toplanan Kişisel Veriler
              </a>
            </li>
            <li>
              <a href="#veri-kullanim-amaci" className="hover:text-brand-600">
                4. Kişisel Verilerin Kullanım Amacı
              </a>
            </li>
            <li>
              <a href="#veri-isleme-hukuki-sebep" className="hover:text-brand-600">
                5. Veri İşlemenin Hukuki Sebepleri
              </a>
            </li>
            <li>
              <a href="#veri-paylasimi" className="hover:text-brand-600">
                6. Kişisel Verilerin Paylaşımı
              </a>
            </li>
            <li>
              <a href="#veri-güvenliği" className="hover:text-brand-600">
                7. Veri Güvenliği
              </a>
            </li>
            <li>
              <a href="#cerezler" className="hover:text-brand-600">
                8. Çerezler (Cookies)
              </a>
            </li>
            <li>
              <a href="#kullanici-haklari" className="hover:text-brand-600">
                9. Kullanıcı Hakları
              </a>
            </li>
            <li>
              <a href="#veri-saklama" className="hover:text-brand-600">
                10. Veri Saklama Süreleri
              </a>
            </li>
            <li>
              <a href="#degisiklikler" className="hover:text-brand-600">
                11. Değişiklikler
              </a>
            </li>
            <li>
              <a href="#iletisim" className="hover:text-brand-600">
                12. İletişim
              </a>
            </li>
          </ol>
        </div>

        {/* Bölümler */}
        <div className="space-y-12 prose prose-slate max-w-none">
          {/* 1. Giriş */}
          <section id="giris">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Giriş</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Hizmetgo olarak, kullanıcılarımızın kişisel verilerinin
                korunmasına büyük önem veriyoruz. Bu Gizlilik Politikası, 6698
                sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
                kapsamında, kişisel verilerinizin nasıl toplandığını,
                kullanıldığını, saklandığını ve korunduğunu açıklar.
              </p>
              <p>
                Bu politikayı okumak, kişisel verilerinizin işlenmesi
                konusunda bilgi sahibi olmanızı ve haklarınızı öğrenmenizi
                sağlar. Platform&apos;u kullanarak, bu politikayı kabul etmiş
                sayılırsınız.
              </p>
            </div>
          </section>

          {/* 2. Veri Sorumlusu */}
          <section id="veri-sorumlusu">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              2. Veri Sorumlusu
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>2.1.</strong> Kişisel verilerinizin işlenmesinden sorumlu
                olan veri sorumlusu Hizmetgo&apos;dur.
              </p>
              <p>
                <strong>2.2.</strong> İletişim bilgilerimiz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>E-posta:</strong>{" "}
                  <a
                    href="mailto:destek@hizmetgo.app"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    destek@hizmetgo.app
                  </a>
                </li>
                <li>
                  <strong>Adres:</strong> İstanbul, Türkiye
                </li>
                <li>
                  <strong>Destek Merkezi:</strong>{" "}
                  <Link
                    href="/support/help"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    /support/help
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Toplanan Kişisel Veriler */}
          <section id="toplanan-veriler">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              3. Toplanan Kişisel Veriler
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>3.1.</strong> Platform&apos;u kullanırken aşağıdaki
                kişisel verileriniz toplanabilir:
              </p>

              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Kimlik Bilgileri
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <User className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Ad, soyad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>E-posta adresi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Telefon numarası</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <User className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Profil fotoğrafı</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  İletişim Bilgileri
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Adres bilgileri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>İletişim tercihleri</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Finansal Bilgiler
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CreditCard className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Ödeme bilgileri (şifrelenmiş)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CreditCard className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Fatura bilgileri</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Kullanım Verileri
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Database className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>IP adresi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Database className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Tarayıcı bilgileri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Database className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Cihaz bilgileri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Kullanım geçmişi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Arama geçmişi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Esnaf Bilgileri (Esnaf Kullanıcılar İçin)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>İşletme adı ve bilgileri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Vergi kimlik numarası</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Lisans ve sertifika bilgileri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>Hizmet kategorileri</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Kişisel Verilerin Kullanım Amacı */}
          <section id="veri-kullanim-amaci">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              4. Kişisel Verilerin Kullanım Amacı
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>4.1.</strong> Kişisel verileriniz aşağıdaki amaçlar için
                kullanılır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Hesap oluşturma ve yönetimi</li>
                <li>Hizmet eşleştirme ve teklif sunma</li>
                <li>Esnaf ve müşteri iletişimi</li>
                <li>Ödeme işlemleri ve faturalama</li>
                <li>Müşteri desteği ve sorun çözme</li>
                <li>Platform iyileştirme ve analiz</li>
                <li>Güvenlik ve dolandırıcılık önleme</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Pazarlama ve tanıtım (izin verilmesi halinde)</li>
                <li>Kullanıcı deneyimini kişiselleştirme</li>
              </ul>
              <p>
                <strong>4.2.</strong> Kişisel verileriniz, yalnızca belirtilen
                amaçlar için kullanılır ve bu amaçlar dışında kullanılmaz.
              </p>
            </div>
          </section>

          {/* 5. Veri İşlemenin Hukuki Sebepleri */}
          <section id="veri-isleme-hukuki-sebep">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              5. Veri İşlemenin Hukuki Sebepleri
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>5.1.</strong> Kişisel verileriniz, KVKK&apos;nın 5. ve
                6. maddelerinde belirtilen aşağıdaki hukuki sebeplerle
                işlenir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Açık Rıza:</strong> Belirli bir konuya ilişkin
                  açıkça verdiğiniz rıza
                </li>
                <li>
                  <strong>Sözleşmenin Kurulması:</strong> Platform kullanım
                  sözleşmesinin kurulması ve ifası
                </li>
                <li>
                  <strong>Yasal Yükümlülük:</strong> Yasal düzenlemelerden
                  kaynaklanan yükümlülüklerin yerine getirilmesi
                </li>
                <li>
                  <strong>Meşru Menfaat:</strong> Platform&apos;un meşru
                  menfaatleri (güvenlik, dolandırıcılık önleme vb.)
                </li>
                <li>
                  <strong>Hayati Menfaat:</strong> Sizin veya başkalarının
                  hayati menfaatlerinin korunması
                </li>
              </ul>
            </div>
          </section>

          {/* 6. Kişisel Verilerin Paylaşımı */}
          <section id="veri-paylasimi">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              6. Kişisel Verilerin Paylaşımı
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>6.1.</strong> Kişisel verileriniz, aşağıdaki durumlarda
                üçüncü taraflarla paylaşılabilir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Hizmet Sağlayıcılar:</strong> Ödeme işleme, bulut
                  depolama, analiz gibi hizmetler için güvenilir üçüncü taraf
                  hizmet sağlayıcıları
                </li>
                <li>
                  <strong>Yasal Zorunluluklar:</strong> Yasal düzenlemeler
                  gereği mahkeme kararları, kamu kurumları talepleri
                </li>
                <li>
                  <strong>İş Ortakları:</strong> Platform hizmetlerinin
                  sunulması için gerekli iş ortakları (sınırlı ve güvenli
                  şekilde)
                </li>
                <li>
                  <strong>Güvenlik:</strong> Güvenlik, dolandırıcılık önleme
                  ve yasal uyumluluk için gerekli durumlar
                </li>
              </ul>
              <p>
                <strong>6.2.</strong> Kişisel verileriniz, ticari amaçlarla
                satılmaz veya üçüncü taraflara kiralanmaz.
              </p>
              <p>
                <strong>6.3.</strong> Verileriniz, yalnızca güvenli ve şifrelenmiş
                kanallar üzerinden paylaşılır.
              </p>
            </div>
          </section>

          {/* 7. Veri Güvenliği */}
          <section id="veri-güvenliği">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              7. Veri Güvenliği
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>7.1.</strong> Kişisel verilerinizin güvenliği bizim
                önceliğimizdir. Verilerinizi korumak için aşağıdaki teknik ve
                idari tedbirleri alıyoruz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>256-bit SSL şifreleme</li>
                <li>Güvenli sunucu altyapısı</li>
                <li>Düzenli güvenlik denetimleri</li>
                <li>Erişim kontrolü ve yetkilendirme</li>
                <li>Veri yedekleme ve kurtarma sistemleri</li>
                <li>Güvenlik açığı taramaları</li>
                <li>Personel eğitimleri</li>
              </ul>
              <p>
                <strong>7.2.</strong> Veri ihlali durumunda, KVKK gereği
                derhal Kişisel Verileri Koruma Kurulu&apos;na ve ilgili
                kullanıcılara bildirim yapılır.
              </p>
            </div>
          </section>

          {/* 8. Çerezler */}
          <section id="cerezler">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              8. Çerezler (Cookies)
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>8.1.</strong> Platform, kullanıcı deneyimini iyileştirmek
                ve analiz yapmak için çerezler kullanır.
              </p>
              <p>
                <strong>8.2.</strong> Kullanılan çerez türleri:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Zorunlu Çerezler:</strong> Platform&apos;un
                  çalışması için gerekli çerezler
                </li>
                <li>
                  <strong>Performans Çerezleri:</strong> Platform performansını
                  analiz etmek için kullanılan çerezler
                </li>
                <li>
                  <strong>Fonksiyonel Çerezler:</strong> Kullanıcı tercihlerini
                  hatırlamak için kullanılan çerezler
                </li>
                <li>
                  <strong>Pazarlama Çerezleri:</strong> İzin verilmesi halinde
                  kullanılan pazarlama çerezleri
                </li>
              </ul>
              <p>
                <strong>8.3.</strong> Çerez tercihlerinizi tarayıcı
                ayarlarınızdan yönetebilirsiniz. Ancak bazı çerezler
                Platform&apos;un çalışması için zorunludur.
              </p>
            </div>
          </section>

          {/* 9. Kullanıcı Hakları */}
          <section id="kullanici-haklari">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              9. Kullanıcı Hakları
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>9.1.</strong> KVKK kapsamında aşağıdaki haklara
                sahipsiniz:
              </p>
              <div className="bg-brand-50 rounded-lg p-6 border border-brand-200">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Bilgi Alma Hakkı:</strong> Kişisel verilerinizin
                      işlenip işlenmediğini öğrenme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Erişim Hakkı:</strong> İşlenen kişisel
                      verilerinize erişme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Düzeltme Hakkı:</strong> Yanlış veya eksik
                      verilerin düzeltilmesini isteme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Silme Hakkı:</strong> Kişisel verilerinizin
                      silinmesini isteme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>İtiraz Hakkı:</strong> Veri işlemeye itiraz etme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Taşınabilirlik Hakkı:</strong> Verilerinizi başka
                      bir platforma aktarma
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                <strong>9.2.</strong> Haklarınızı kullanmak için{" "}
                <a
                  href="mailto:destek@hizmetgo.app"
                  className="text-brand-600 hover:text-brand-700 underline"
                >
                  destek@hizmetgo.app
                </a>{" "}
                adresine e-posta gönderebilir veya{" "}
                <Link
                  href="/support/help"
                  className="text-brand-600 hover:text-brand-700 underline"
                >
                  destek merkezimiz
                </Link>{" "}
                üzerinden başvurabilirsiniz.
              </p>
            </div>
          </section>

          {/* 10. Veri Saklama Süreleri */}
          <section id="veri-saklama">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              10. Veri Saklama Süreleri
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>10.1.</strong> Kişisel verileriniz, işleme amacının
                gerektirdiği süre boyunca saklanır.
              </p>
              <p>
                <strong>10.2.</strong> Genel saklama süreleri:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Hesap Bilgileri:</strong> Hesap aktif olduğu sürece
                  ve hesap kapatıldıktan sonra 2 yıl
                </li>
                <li>
                  <strong>Ödeme Bilgileri:</strong> Yasal saklama yükümlülüğü
                  süresi boyunca (10 yıl)
                </li>
                <li>
                  <strong>İletişim Kayıtları:</strong> 3 yıl
                </li>
                <li>
                  <strong>Kullanım Verileri:</strong> 2 yıl
                </li>
                <li>
                  <strong>Pazarlama İzinleri:</strong> İzin geri alınana kadar
                </li>
              </ul>
              <p>
                <strong>10.3.</strong> Yasal saklama yükümlülükleri varsa,
                veriler bu süre boyunca saklanır.
              </p>
            </div>
          </section>

          {/* 11. Değişiklikler */}
          <section id="degisiklikler">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              11. Değişiklikler
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>11.1.</strong> Bu Gizlilik Politikası, yasal
                düzenlemelerdeki değişiklikler veya Platform iyileştirmeleri
                nedeniyle güncellenebilir.
              </p>
              <p>
                <strong>11.2.</strong> Önemli değişiklikler, Platform üzerinden
                veya e-posta ile duyurulur.
              </p>
              <p>
                <strong>11.3.</strong> Güncel politika, Platform üzerinde
                yayınlandığı tarihten itibaren geçerlidir.
              </p>
            </div>
          </section>

          {/* 12. İletişim */}
          <section id="iletisim">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              12. İletişim
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>12.1.</strong> Gizlilik politikası ile ilgili sorularınız
                için aşağıdaki iletişim kanallarını kullanabilirsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>E-posta:</strong>{" "}
                  <a
                    href="mailto:destek@hizmetgo.app"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    destek@hizmetgo.app
                  </a>
                </li>
                <li>
                  <strong>Destek Merkezi:</strong>{" "}
                  <Link
                    href="/support/help"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    /support/help
                  </Link>
                </li>
                <li>
                  <strong>KVKK Başvurusu:</strong> KVKK kapsamındaki
                  başvurularınızı yukarıdaki kanallar üzerinden yapabilirsiniz.
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* İlgili Bağlantılar */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Link
            href="/legal/terms"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <FileText className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              Kullanım Şartları
            </h3>
            <p className="text-slate-600 text-sm">
              Platform kullanım şartlarını öğrenin
            </p>
          </Link>
          <Link
            href="/legal/kvkk"
            className="block bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
          >
            <Shield className="w-8 h-8 text-brand-600 mb-3" />
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
