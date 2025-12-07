import { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Şartları | Hizmetgo",
  description:
    "Hizmetgo platformunu kullanırken uymanız gereken şartlar ve koşullar. Kullanıcı sözleşmesi, haklar ve yükümlülükler.",
  keywords: [
    "kullanım şartları",
    "kullanıcı sözleşmesi",
    "şartlar ve koşullar",
    "hizmetgo şartları",
  ],
};

export default function TermsPage() {
  const lastUpdated = "1 Ocak 2025";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <FileText className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Kullanım Şartları
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmetgo platformunu kullanırken uymanız gereken şartlar ve
              koşullar. Lütfen dikkatlice okuyun.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              Son güncelleme: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Önemli Uyarı */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">
                Önemli Uyarı
              </h3>
              <p className="text-amber-800 leading-relaxed">
                Bu Kullanım Şartları, Hizmetgo platformunu kullanırken uymanız
                gereken tüm kuralları içerir. Platformu kullanarak, bu şartların
                tamamını kabul etmiş sayılırsınız. Lütfen dikkatlice okuyun ve
                anlamadığınız bir bölüm varsa destek ekibimizle iletişime
                geçin.
              </p>
            </div>
          </div>
        </div>

        {/* İçindekiler */}
        <div className="bg-slate-50 rounded-xl p-6 mb-12 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">İçindekiler</h2>
          <ol className="space-y-2 text-slate-700">
            <li>
              <a href="#genel-hukumler" className="hover:text-brand-600">
                1. Genel Hükümler
              </a>
            </li>
            <li>
              <a href="#hizmet-tanimi" className="hover:text-brand-600">
                2. Hizmet Tanımı
              </a>
            </li>
            <li>
              <a href="#kayit-ve-hesap" className="hover:text-brand-600">
                3. Kayıt ve Hesap
              </a>
            </li>
            <li>
              <a href="#kullanici-yukumlulukleri" className="hover:text-brand-600">
                4. Kullanıcı Yükümlülükleri
              </a>
            </li>
            <li>
              <a href="#esnaf-yukumlulukleri" className="hover:text-brand-600">
                5. Esnaf Yükümlülükleri
              </a>
            </li>
            <li>
              <a href="#odeme-ve-faturalama" className="hover:text-brand-600">
                6. Ödeme ve Faturalama
              </a>
            </li>
            <li>
              <a href="#iptal-ve-iade" className="hover:text-brand-600">
                7. İptal ve İade
              </a>
            </li>
            <li>
              <a href="#gizlilik-ve-veri-koruma" className="hover:text-brand-600">
                8. Gizlilik ve Veri Koruma
              </a>
            </li>
            <li>
              <a href="#fikri-mulkiyet" className="hover:text-brand-600">
                9. Fikri Mülkiyet
              </a>
            </li>
            <li>
              <a href="#sorumluluk-sinirlamalari" className="hover:text-brand-600">
                10. Sorumluluk Sınırlamaları
              </a>
            </li>
            <li>
              <a href="#hesap-sonlandirma" className="hover:text-brand-600">
                11. Hesap Sonlandırma
              </a>
            </li>
            <li>
              <a href="#degisiklikler" className="hover:text-brand-600">
                12. Değişiklikler
              </a>
            </li>
            <li>
              <a href="#uyusmazlik-cozumu" className="hover:text-brand-600">
                13. Uyuşmazlık Çözümü
              </a>
            </li>
            <li>
              <a href="#iletisim" className="hover:text-brand-600">
                14. İletişim
              </a>
            </li>
          </ol>
        </div>

        {/* Bölümler */}
        <div className="space-y-12 prose prose-slate max-w-none">
          {/* 1. Genel Hükümler */}
          <section id="genel-hukumler">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  1. Genel Hükümler
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>1.1.</strong> Bu Kullanım Şartları (&quot;Şartlar&quot;),
                Hizmetgo platformunu (&quot;Platform&quot;) kullanarak hizmet
                alan veya veren tüm kullanıcılar için geçerlidir. Platformu
                kullanarak, bu Şartlar&apos;ın tüm hükümlerini kabul etmiş
                  sayılırsınız.
                </p>
              <p>
                <strong>1.2.</strong> Hizmetgo (&quot;Biz&quot;, &quot;Bizim&quot;,
                &quot;Şirket&quot;), bu Şartlar&apos;ı istediği zaman
                değiştirme hakkına sahiptir. Değişiklikler Platform üzerinden
                duyurulur ve yayınlandığı tarihten itibaren geçerlidir.
              </p>
              <p>
                <strong>1.3.</strong> Bu Şartlar, Türkiye Cumhuriyeti yasalarına
                tabidir ve Türk Ticaret Kanunu, Türk Borçlar Kanunu ve 6698
                sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında
                düzenlenmiştir.
              </p>
              <p>
                <strong>1.4.</strong> Platform, 18 yaşını doldurmuş ve yasal
                ehliyet sahibi kişiler tarafından kullanılabilir. 18 yaş altı
                kullanıcılar, yasal vekillerinin izni ve gözetimi altında
                Platform&apos;u kullanabilir.
              </p>
            </div>
              </section>

          {/* 2. Hizmet Tanımı */}
          <section id="hizmet-tanimi">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  2. Hizmet Tanımı
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>2.1.</strong> Hizmetgo, mahalle esnafı ve hizmet
                sağlayıcıları ile müşterileri buluşturan bir dijital platformdur.
                Platform, kullanıcıların hizmet talep etmesine, esnafların
                hizmet sunmasına ve bu süreçlerin yönetilmesine olanak sağlar.
              </p>
              <p>
                <strong>2.2.</strong> Hizmetgo, bir hizmet sağlayıcısı değil,
                hizmet eşleştirme platformudur. Platform üzerinden sunulan
                hizmetler, kayıtlı esnaflar tarafından sağlanır ve Hizmetgo bu
                hizmetlerin kalitesinden, güvenilirliğinden veya sonuçlarından
                sorumlu değildir.
              </p>
              <p>
                <strong>2.3.</strong> Platform, aşağıdaki hizmetleri sunar:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Hizmet arama ve filtreleme</li>
                <li>Esnaf ve müşteri eşleştirme</li>
                <li>Teklif alma ve karşılaştırma</li>
                <li>Güvenli ödeme işlemleri</li>
                <li>İletişim ve mesajlaşma</li>
                <li>Değerlendirme ve yorum sistemi</li>
              </ul>
            </div>
          </section>

          {/* 3. Kayıt ve Hesap */}
          <section id="kayit-ve-hesap">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              3. Kayıt ve Hesap
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>3.1.</strong> Platform&apos;u kullanmak için ücretsiz
                bir hesap oluşturmanız gerekir. Hesap oluştururken doğru, güncel
                ve eksiksiz bilgiler sağlamakla yükümlüsünüz.
              </p>
              <p>
                <strong>3.2.</strong> Hesap bilgilerinizin güvenliğinden siz
                sorumlusunuz. Şifrenizi kimseyle paylaşmayın ve şüpheli bir
                aktivite fark ederseniz derhal bize bildirin.
              </p>
              <p>
                <strong>3.3.</strong> Esnaf olarak kayıt olmak için ek
                doğrulama süreçlerinden geçmeniz gerekebilir. Bu süreçte kimlik
                doğrulama, telefon doğrulama ve gerekli belgelerin kontrolü
                yapılır.
              </p>
              <p>
                <strong>3.4.</strong> Bir kullanıcı yalnızca bir hesap
                oluşturabilir. Çoklu hesap oluşturma yasaktır ve tespit edildiğinde
                hesaplar sonlandırılır.
              </p>
            </div>
          </section>

          {/* 4. Kullanıcı Yükümlülükleri */}
          <section id="kullanici-yukumlulukleri">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              4. Kullanıcı Yükümlülükleri
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>4.1.</strong> Platform&apos;u yasalara, bu Şartlar&apos;a
                ve ahlaki kurallara uygun şekilde kullanmakla yükümlüsünüz.
              </p>
              <p>
                <strong>4.2.</strong> Aşağıdaki faaliyetler kesinlikle yasaktır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Yanlış, yanıltıcı veya eksik bilgi verme</li>
                <li>Başkası adına hesap oluşturma veya kullanma</li>
                <li>Spam, reklam veya istenmeyen içerik paylaşma</li>
                <li>Hakaret, tehdit veya taciz içeren içerik paylaşma</li>
                <li>Telif haklarını ihlal eden içerik paylaşma</li>
                <li>Platform&apos;un güvenliğini tehdit eden faaliyetler</li>
                <li>Otomatik botlar veya scriptler kullanma</li>
                <li>Diğer kullanıcıların bilgilerini izinsiz kullanma</li>
              </ul>
              <p>
                <strong>4.3.</strong> Platform üzerinden yaptığınız tüm
                işlemlerden ve paylaştığınız içeriklerden siz sorumlusunuz.
              </p>
              <p>
                <strong>4.4.</strong> Esnaflarla iletişim kurarken saygılı ve
                profesyonel bir dil kullanmalısınız.
              </p>
            </div>
              </section>

          {/* 5. Esnaf Yükümlülükleri */}
          <section id="esnaf-yukumlulukleri">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              5. Esnaf Yükümlülükleri
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>5.1.</strong> Esnaf olarak kayıt olan kullanıcılar,
                aşağıdaki yükümlülüklere uymakla yükümlüdür:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Doğru, güncel ve eksiksiz işletme bilgileri sağlama
                </li>
                <li>
                  Gerekli lisans, sertifika ve belgeleri Platform&apos;a yükleme
                </li>
                <li>
                  Müşterilere kaliteli, güvenli ve zamanında hizmet sunma
                </li>
                <li>
                  Teklif verirken gerçekçi ve doğru fiyatlandırma yapma
                </li>
                <li>
                  Müşterilerle saygılı ve profesyonel iletişim kurma
                </li>
                <li>
                  Anlaşma yapılan işleri zamanında ve kaliteli şekilde tamamlama
                </li>
                <li>
                  Müşteri bilgilerini gizli tutma ve yalnızca hizmet sunumu için
                  kullanma
                  </li>
                </ul>
              <p>
                <strong>5.2.</strong> Esnaflar, Platform üzerinden aldıkları
                işlerden ve bu işlerin sonuçlarından sorumludur. Hizmetgo, esnaf
                hizmetlerinin kalitesini garanti etmez.
              </p>
              <p>
                <strong>5.3.</strong> Esnaflar, Platform üzerinden yaptıkları
                işler için gerekli sigorta ve yasal yükümlülükleri yerine
                getirmekle yükümlüdür.
              </p>
            </div>
          </section>

          {/* 6. Ödeme ve Faturalama */}
          <section id="odeme-ve-faturalama">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              6. Ödeme ve Faturalama
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>6.1.</strong> Platform üzerinden yapılan ödemeler,
                güvenli ödeme altyapısı ile işlenir. Kredi kartı bilgileriniz
                bizim sunucularımızda saklanmaz.
              </p>
              <p>
                <strong>6.2.</strong> Ödemeler, iş tamamlanana kadar Platform
                tarafından tutulur ve iş tamamlandıktan sonra esnafa
                aktarılır. Bu süreç, müşteri ve esnaf için güvence sağlar.
              </p>
              <p>
                <strong>6.3.</strong> Platform, hizmet eşleştirme hizmeti için
                esnaflardan komisyon alabilir. Komisyon oranları Platform
                üzerinden duyurulur.
              </p>
              <p>
                <strong>6.4.</strong> Tüm ödemeler Türk Lirası (TRY) cinsinden
                yapılır. Fiyatlar KDV dahil veya hariç olarak gösterilebilir.
              </p>
              <p>
                <strong>6.5.</strong> Faturalama, esnaf tarafından yapılır.
                Hizmetgo, fatura kesme yükümlülüğü bulunmamaktadır.
              </p>
            </div>
          </section>

          {/* 7. İptal ve İade */}
          <section id="iptal-ve-iade">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              7. İptal ve İade
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>7.1.</strong> İptal koşulları, her hizmet ve esnaf için
                farklı olabilir. İptal koşulları, teklif aşamasında veya iş
                başlamadan önce belirtilir.
              </p>
              <p>
                <strong>7.2.</strong> Müşteri, iş başlamadan önce iptal
                ederse, ödeme iade edilir. İş başladıktan sonra yapılan
                iptallerde, tamamlanan kısım için ödeme yapılır.
              </p>
              <p>
                <strong>7.3.</strong> Esnaf, işi tamamlayamazsa veya
                anlaşmaya uymazsa, ödeme müşteriye iade edilir.
              </p>
              <p>
                <strong>7.4.</strong> İade işlemleri, Platform politikalarına
                göre yapılır ve genellikle 5-10 iş günü içinde tamamlanır.
              </p>
            </div>
          </section>

          {/* 8. Gizlilik ve Veri Koruma */}
          <section id="gizlilik-ve-veri-koruma">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              8. Gizlilik ve Veri Koruma
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>8.1.</strong> Kişisel verilerinizin korunması bizim
                önceliğimizdir. Verileriniz, 6698 sayılı KVKK kapsamında
                korunur.
              </p>
              <p>
                <strong>8.2.</strong> Kişisel verileriniz yalnızca hizmet
                sunumu, Platform iyileştirme ve yasal yükümlülükler için
                kullanılır.
              </p>
              <p>
                <strong>8.3.</strong> Verileriniz, üçüncü taraflarla yasal
                zorunluluklar dışında paylaşılmaz.
              </p>
              <p>
                <strong>8.4.</strong> Detaylı bilgi için{" "}
                <Link
                  href="/legal/privacy"
                  className="text-brand-600 hover:text-brand-700 underline"
                >
                  Gizlilik Politikamızı
                </Link>{" "}
                ve{" "}
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

          {/* 9. Fikri Mülkiyet */}
          <section id="fikri-mulkiyet">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              9. Fikri Mülkiyet
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>9.1.</strong> Platform içeriği, tasarımı, logosu ve
                tüm fikri mülkiyet hakları Hizmetgo&apos;ya aittir.
              </p>
              <p>
                <strong>9.2.</strong> Platform içeriğini izinsiz kopyalama,
                dağıtma, değiştirme veya ticari amaçla kullanma yasaktır.
              </p>
              <p>
                <strong>9.3.</strong> Kullanıcılar, Platform&apos;a yükledikleri
                içeriklerin (fotoğraf, yorum, vb.) telif haklarını Hizmetgo&apos;ya
                devreder ve bu içeriklerin Platform&apos;da kullanılmasına izin
                verir.
              </p>
            </div>
              </section>

          {/* 10. Sorumluluk Sınırlamaları */}
          <section id="sorumluluk-sinirlamalari">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              10. Sorumluluk Sınırlamaları
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>10.1.</strong> Hizmetgo, Platform üzerinden sunulan
                hizmetlerin kalitesinden, güvenilirliğinden veya sonuçlarından
                sorumlu değildir. Hizmetler, kayıtlı esnaflar tarafından
                sağlanır.
              </p>
              <p>
                <strong>10.2.</strong> Hizmetgo, Platform&apos;un kesintisiz,
                hatasız veya güvenli çalışmasını garanti etmez. Platform,
                &quot;olduğu gibi&quot; sunulur.
              </p>
              <p>
                <strong>10.3.</strong> Kullanıcılar, Platform&apos;u kendi
                riskleri altında kullanır. Hizmetgo, Platform kullanımından
                kaynaklanan doğrudan veya dolaylı zararlardan sorumlu değildir.
              </p>
              <p>
                <strong>10.4.</strong> Hizmetgo, üçüncü taraf web sitelerine
                veya hizmetlere yapılan bağlantılardan sorumlu değildir.
              </p>
            </div>
              </section>

          {/* 11. Hesap Sonlandırma */}
          <section id="hesap-sonlandirma">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              11. Hesap Sonlandırma
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>11.1.</strong> Hizmetgo, bu Şartlar&apos;ı ihlal eden
                kullanıcıların hesaplarını uyarı yapmadan sonlandırma hakkına
                sahiptir.
              </p>
              <p>
                <strong>11.2.</strong> Kullanıcı, istediği zaman hesabını
                sonlandırabilir. Hesap sonlandırma işlemi, Platform üzerinden
                yapılabilir.
              </p>
              <p>
                <strong>11.3.</strong> Hesap sonlandırıldığında, kullanıcının
                Platform&apos;a erişimi kesilir ancak geçmiş işlemler ve
                veriler saklanabilir.
              </p>
            </div>
              </section>

          {/* 12. Değişiklikler */}
          <section id="degisiklikler">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              12. Değişiklikler
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>12.1.</strong> Hizmetgo, bu Şartlar&apos;ı istediği
                zaman değiştirme hakkına sahiptir. Önemli değişiklikler,
                Platform üzerinden veya e-posta ile duyurulur.
              </p>
              <p>
                <strong>12.2.</strong> Değişiklikler, Platform üzerinde
                yayınlandığı tarihten itibaren geçerlidir. Değişikliklerden
                sonra Platform&apos;u kullanmaya devam ederseniz, yeni
                Şartlar&apos;ı kabul etmiş sayılırsınız.
              </p>
              <p>
                <strong>12.3.</strong> Değişiklikleri kabul etmiyorsanız,
                hesabınızı sonlandırabilirsiniz.
              </p>
            </div>
              </section>

          {/* 13. Uyuşmazlık Çözümü */}
          <section id="uyusmazlik-cozumu">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              13. Uyuşmazlık Çözümü
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>13.1.</strong> Uyuşmazlıklar öncelikle müzakere ile
                çözülmeye çalışılır. Sorun yaşadığınızda destek ekibimizle
                iletişime geçin.
              </p>
              <p>
                <strong>13.2.</strong> Çözülemeyen uyuşmazlıklar, Türkiye
                Cumhuriyeti yasalarına göre çözülür.
              </p>
              <p>
                <strong>13.3.</strong> Uyuşmazlıklar, İstanbul Mahkemeleri ve
                İcra Daireleri&apos;nin yetkisi altındadır.
              </p>
              <p>
                <strong>13.4.</strong> Tüketici hakları kapsamındaki
                uyuşmazlıklar, Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri
                tarafından çözülür.
              </p>
            </div>
              </section>

          {/* 14. İletişim */}
          <section id="iletisim">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              14. İletişim
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>14.1.</strong> Bu Şartlar ile ilgili sorularınız için
                aşağıdaki iletişim kanallarını kullanabilirsiniz:
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
              </ul>
              <p>
                <strong>14.2.</strong> Destek ekibimiz, hafta içi 09:00-18:00
                saatleri arasında hizmetinizdedir. Acil durumlar için 7/24
                destek hattımız mevcuttur.
              </p>
            </div>
              </section>
        </div>

        {/* Onay Bölümü */}
        <div className="mt-12 bg-brand-50 rounded-xl p-6 border border-brand-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kullanım Şartlarını Kabul Ediyorum
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Bu Kullanım Şartları&apos;nı okudum, anladım ve kabul ediyorum.
                Platform&apos;u kullanarak, bu Şartlar&apos;ın tüm
                hükümlerine uyacağımı taahhüt ederim.
              </p>
            </div>
          </div>
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
              Kişisel verilerinizin nasıl korunduğunu öğrenin
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
              KVKK kapsamında haklarınızı öğrenin
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
              Güvenlik özelliklerimiz hakkında bilgi edinin
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
