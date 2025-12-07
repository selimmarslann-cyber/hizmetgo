import { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Hizmetgo",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni. Kişisel verilerinizin işlenmesi hakkında bilgi.",
  keywords: [
    "KVKK",
    "aydınlatma metni",
    "kişisel veri koruma",
    "6698 sayılı kanun",
  ],
};

export default function KVKKPage() {
  const lastUpdated = "1 Ocak 2025";

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
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
              aydınlatma metni
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
                Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
                Kanunu (&quot;KVKK&quot;) uyarınca hazırlanmıştır. Kişisel
                verilerinizin işlenmesi hakkında bilgilendirilmek üzere
                hazırlanmıştır.
              </p>
            </div>
          </div>
        </div>

        {/* Bölümler */}
        <div className="space-y-12 prose prose-slate max-w-none">
          {/* 1. Veri Sorumlusu */}
              <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              1. Veri Sorumlusunun Kimliği
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
                uyarınca, kişisel verileriniz Hizmetgo (&quot;Veri
                Sorumlusu&quot;) tarafından veri sorumlusu sıfatıyla
                  işlenmektedir.
                </p>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Veri Sorumlusu Bilgileri
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Unvan:</strong> Hizmetgo
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Adres:</strong> İstanbul, Türkiye
                    </div>
                  </li>
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
                </ul>
              </div>
            </div>
              </section>

          {/* 2. İşlenen Kişisel Veriler */}
              <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  2. İşlenen Kişisel Veriler
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                  Platform&apos;u kullanırken aşağıdaki kişisel verileriniz
                  işlenmektedir:
                </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                  <strong>Kimlik Bilgileri:</strong> Ad, soyad, doğum tarihi,
                  TC kimlik numarası (esnaf kullanıcılar için)
                </li>
                <li>
                  <strong>İletişim Bilgileri:</strong> E-posta adresi, telefon
                  numarası, adres bilgileri
                  </li>
                  <li>
                  <strong>Müşteri İşlem Bilgileri:</strong> Hizmet talepleri,
                  teklif bilgileri, sipariş geçmişi, değerlendirme ve yorumlar
                  </li>
                  <li>
                  <strong>Finansal Bilgiler:</strong> Ödeme bilgileri (şifrelenmiş),
                  fatura bilgileri, işlem geçmişi
                  </li>
                  <li>
                  <strong>İşletme Bilgileri:</strong> İşletme adı, vergi kimlik
                  numarası, lisans ve sertifika bilgileri (esnaf kullanıcılar
                  için)
                  </li>
                  <li>
                  <strong>Lokasyon Bilgileri:</strong> Konum verileri (hizmet
                  talebi için gerekli olduğunda)
                  </li>
                  <li>
                  <strong>Kullanım Verileri:</strong> IP adresi, cihaz bilgileri,
                  tarayıcı bilgileri, kullanım geçmişi, arama geçmişi
                  </li>
                  <li>
                  <strong>Pazarlama ve İletişim Tercihleri:</strong> Pazarlama
                  izinleri, bildirim tercihleri
                  </li>
                </ul>
            </div>
              </section>

          {/* 3. Kişisel Verilerin İşlenme Amaçları */}
              <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  3. Kişisel Verilerin İşlenme Amaçları
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Toplanan kişisel verileriniz, aşağıdaki amaçlarla işlenmektedir:
                </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Platform hizmetlerinin sunulması, geliştirilmesi ve
                  yönetilmesi
                </li>
                <li>Kullanıcı hesaplarının oluşturulması ve yönetilmesi</li>
                <li>
                  Hizmet eşleştirme, teklif sunma ve esnaf-müşteri iletişimi
                </li>
                <li>Ödeme işlemlerinin gerçekleştirilmesi ve faturalama</li>
                <li>Müşteri desteği sağlanması ve sorun çözme</li>
                <li>
                  Platform iyileştirme, analiz ve kullanıcı deneyimini
                  kişiselleştirme
                </li>
                <li>Güvenlik, dolandırıcılık önleme ve yasal uyumluluk</li>
                <li>
                  Yasal yükümlülüklerin yerine getirilmesi (vergi, muhasebe,
                  vb.)
                  </li>
                  <li>
                  Pazarlama ve tanıtım faaliyetlerinin yürütülmesi (açık rıza
                    verilmesi halinde)
                  </li>
                  <li>İstatistiksel analiz ve raporlama</li>
                </ul>
            </div>
              </section>

          {/* 4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi */}
              <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>4.1. Toplanma Yöntemi:</strong> Kişisel verileriniz,
                aşağıdaki yöntemlerle toplanmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Platform üzerinden elektronik ortamda otomatik veya otomatik
                  olmayan yöntemlerle
                </li>
                <li>Kullanıcı kayıt formları ve profil bilgileri</li>
                <li>Hizmet talepleri ve teklif formları</li>
                <li>Ödeme işlemleri sırasında</li>
                <li>Müşteri desteği iletişimleri</li>
                <li>Çerezler (cookies) ve benzeri teknolojiler</li>
                <li>Üçüncü taraf hizmet sağlayıcılarından (sosyal medya
                  girişleri vb.)
                </li>
              </ul>
              <p>
                <strong>4.2. Hukuki Sebep:</strong> Kişisel verileriniz, KVKK&apos;nın
                5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere
                dayanarak işlenmektedir:
                </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Açık Rıza:</strong> Belirli bir konuya ilişkin
                  açıkça verdiğiniz rıza (pazarlama faaliyetleri için)
                </li>
                  <li>
                  <strong>Sözleşmenin Kurulması veya İfası:</strong> Platform
                  kullanım sözleşmesinin kurulması ve ifası için gerekli
                    olması
                  </li>
                <li>
                  <strong>Yasal Yükümlülük:</strong> Yasal düzenlemelerden
                  kaynaklanan yükümlülüklerin yerine getirilmesi (vergi, muhasebe
                  vb.)
                </li>
                  <li>
                  <strong>Meşru Menfaat:</strong> Veri sorumlusunun meşru
                  menfaatleri (güvenlik, dolandırıcılık önleme, platform
                  iyileştirme vb.)
                  </li>
                  <li>
                  <strong>Hayati Menfaat:</strong> Sizin veya başkalarının
                  hayati menfaatlerinin korunması
                  </li>
                </ul>
            </div>
              </section>

          {/* 5. Kişisel Verilerin Aktarılması */}
              <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  5. Kişisel Verilerin Aktarılması
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>5.1.</strong> Toplanan kişisel verileriniz, yukarıda
                belirtilen amaçlar doğrultusunda, aşağıdaki durumlarda üçüncü
                kişilere aktarılabilir:
                </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Hizmet Sağlayıcılar:</strong> Ödeme işleme, bulut
                  depolama, analiz, e-posta gönderimi gibi hizmetler için
                  güvenilir üçüncü taraf hizmet sağlayıcıları (sınırlı ve güvenli
                  şekilde)
                </li>
                <li>
                  <strong>Yasal Zorunluluklar:</strong> Yasal düzenlemeler
                  gereği mahkeme kararları, kamu kurumları talepleri, vergi
                  dairesi, sosyal güvenlik kurumu vb.
                </li>
                  <li>
                  <strong>İş Ortakları:</strong> Platform hizmetlerinin
                  sunulması için gerekli iş ortakları (sınırlı ve güvenli
                  şekilde)
                  </li>
                  <li>
                  <strong>Güvenlik:</strong> Güvenlik, dolandırıcılık önleme ve
                  yasal uyumluluk için gerekli durumlar
                  </li>
                </ul>
              <p>
                <strong>5.2.</strong> Kişisel verileriniz, ticari amaçlarla
                satılmaz veya üçüncü taraflara kiralanmaz.
              </p>
              <p>
                <strong>5.3.</strong> Verileriniz, yalnızca güvenli ve şifrelenmiş
                kanallar üzerinden aktarılır ve KVKK&apos;ya uygun şekilde
                korunur.
              </p>
            </div>
              </section>

          {/* 6. İlgili Kişinin Hakları */}
              <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              6. İlgili Kişinin Hakları (KVKK Madde 11)
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                KVKK&apos;nın 11. maddesi uyarınca, kişisel veri sahipleri olarak
                aşağıdaki haklara sahipsiniz:
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
                      <strong>Erişim Hakkı:</strong> İşlenmişse buna ilişkin
                      bilgi talep etme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Amacı Öğrenme Hakkı:</strong> İşlenme amacını ve
                      bunların amacına uygun kullanılıp kullanılmadığını öğrenme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Aktarım Bilgisi Hakkı:</strong> Yurt içinde veya
                      yurt dışında aktarıldığı üçüncü kişileri bilme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Düzeltme Hakkı:</strong> Eksik veya yanlış
                      işlenmişse düzeltilmesini isteme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Silme/Yok Etme Hakkı:</strong> İşlenmesini
                      gerektiren sebeplerin ortadan kalkması halinde silinmesini
                      veya yok edilmesini isteme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>İtiraz Hakkı:</strong> İşlemenin münhasıran
                      otomatik sistemler vasıtasıyla analiz edilmesi nedeniyle
                      aleyhinize bir sonucun ortaya çıkmasına itiraz etme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Zararın Giderilmesi Hakkı:</strong> Kanuna aykırı
                      olarak işlenmesi sebebiyle zarara uğramanız halinde zararın
                      giderilmesini talep etme
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                <strong>6.1. Haklarınızı Kullanma:</strong> Yukarıda belirtilen
                haklarınızı kullanmak için aşağıdaki yöntemlerden birini
                kullanabilirsiniz:
                </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>E-posta:</strong>{" "}
                  <a
                    href="mailto:kvkk@hizmetgo.app"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    kvkk@hizmetgo.app
                  </a>{" "}
                  adresine kimlik tespiti yapılmış e-posta gönderme
                </li>
                <li>
                  <strong>Yazılı Başvuru:</strong> Yukarıda belirtilen adrese
                  kimlik tespiti yapılmış yazılı başvuru gönderme
                </li>
                <li>
                  <strong>Destek Merkezi:</strong>{" "}
                  <Link
                    href="/support/help"
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    Destek merkezimiz
                  </Link>{" "}
                  üzerinden başvuru yapma
                </li>
              </ul>
              <p>
                <strong>6.2. Başvuru Süresi:</strong> Başvurularınız, en geç 30
                (otuz) gün içinde sonuçlandırılır ve size bildirilir.
              </p>
              <p>
                <strong>6.3. Şikayet Hakkı:</strong> Başvurunuza verilen
                yanıtı yetersiz bulmanız veya başvurunuza hiç yanıt
                verilmemesi halinde, Kişisel Verileri Koruma Kurulu&apos;na
                şikayette bulunabilirsiniz.
                </p>
            </div>
          </section>

          {/* 7. Veri Güvenliği */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              7. Veri Güvenliği
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Kişisel verilerinizin güvenliği bizim önceliğimizdir. Verilerinizi
                korumak için aşağıdaki teknik ve idari tedbirleri alıyoruz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>256-bit SSL şifreleme</li>
                <li>Güvenli sunucu altyapısı</li>
                <li>Düzenli güvenlik denetimleri</li>
                <li>Erişim kontrolü ve yetkilendirme</li>
                <li>Veri yedekleme ve kurtarma sistemleri</li>
                <li>Güvenlik açığı taramaları</li>
                <li>Personel eğitimleri ve gizlilik taahhütleri</li>
              </ul>
            </div>
              </section>

          {/* 8. Veri Saklama Süreleri */}
              <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              8. Veri Saklama Süreleri
                </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca
                saklanır. Genel saklama süreleri aşağıdaki gibidir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Hesap Bilgileri:</strong> Hesap aktif olduğu sürece
                  ve hesap kapatıldıktan sonra 2 (iki) yıl
                </li>
                <li>
                  <strong>Ödeme Bilgileri:</strong> Yasal saklama yükümlülüğü
                  süresi boyunca (10 yıl)
                </li>
                <li>
                  <strong>İletişim Kayıtları:</strong> 3 (üç) yıl
                </li>
                <li>
                  <strong>Kullanım Verileri:</strong> 2 (iki) yıl
                </li>
                <li>
                  <strong>Pazarlama İzinleri:</strong> İzin geri alınana kadar
                </li>
              </ul>
              <p>
                Yasal saklama yükümlülükleri varsa, veriler bu süre boyunca
                saklanır.
                </p>
            </div>
              </section>

          {/* 9. İletişim */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              9. İletişim
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                KVKK kapsamındaki başvurularınız ve sorularınız için aşağıdaki
                iletişim bilgilerini kullanabilirsiniz:
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
                    <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Adres:</strong> İstanbul, Türkiye
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
                </ul>
              </div>
            </div>
          </section>
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
