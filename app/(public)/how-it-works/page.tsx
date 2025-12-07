import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Shield,
  Star,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hizmetgo Nasıl Kullanılır? | Detaylı Kullanım Rehberi",
  description:
    "Hizmetgo'yu nasıl kullanacağınızı öğrenin. Adım adım rehber, hizmet arama, teklif alma, esnaf seçimi ve ödeme süreçleri hakkında detaylı bilgi.",
  keywords: [
    "hizmetgo nasıl kullanılır",
    "hizmet arama",
    "esnaf bulma",
    "teklif alma",
    "hizmetgo rehberi",
  ],
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Hizmetgo Nasıl Kullanılır?
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Evinizdeki her ihtiyacı kolayca çözmenin yolu. Adım adım rehberimizle
              Hizmetgo'yu keşfedin.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hızlı Başlangıç */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Hızlı Başlangıç
          </h2>
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Hizmetgo, evinizdeki her türlü hizmet ihtiyacınızı karşılamak için
              tasarlanmış bir platformdur. Elektrik tamirinden temizlik hizmetine,
              boya badanadan nakliyata kadar yüzlerce kategoride hizmet sağlayıcı
              bulabilir, teklif alabilir ve işinizi hallettirebilirsiniz.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-3xl font-bold text-brand-600 mb-2">3</div>
                <div className="text-sm text-slate-600">Basit Adım</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-3xl font-bold text-brand-600 mb-2">24/7</div>
                <div className="text-sm text-slate-600">Destek</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-3xl font-bold text-brand-600 mb-2">100%</div>
                <div className="text-sm text-slate-600">Güvenli</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Ana Adım */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Hizmetgo ile 3 Basit Adımda İşinizi Halledin
          </h2>
          <div className="space-y-12">
            {/* Adım 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="w-6 h-6 text-brand-600" />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    İhtiyacınızı Belirtin
                  </h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Hangi hizmete ihtiyacınız var? Arama çubuğuna yazın veya
                  kategorilerden seçin. İhtiyacınızı detaylıca anlatın.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h4 className="font-semibold text-slate-900 mb-4">
                    Nasıl Arama Yapılır?
                  </h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Ana sayfadaki arama çubuğunu kullanın:</strong>{" "}
                        "Elektrik tamiri", "Temizlik", "Boya badana" gibi
                        anahtar kelimeler yazın
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Kategori çubuğundan seçin:</strong> Header'daki
                        kategori çubuğundan doğrudan kategori seçebilirsiniz
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Detaylı açıklama yazın:</strong> İhtiyacınızı ne
                        kadar detaylı anlatırsanız, o kadar uygun teklifler
                        alırsınız
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg border border-slate-200">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Arama Türü
                        </th>
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Örnek
                        </th>
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Sonuç
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Kategori Adı
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          "Elektrik"
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Elektrik kategorisindeki tüm esnaflar
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Hizmet Açıklaması
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          "Prizi değiştirmem gerekiyor"
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          İlgili esnaflar ve teklifler
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Konum + Hizmet
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          "Kadıköy temizlik"
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Kadıköy'deki temizlik hizmeti sağlayıcıları
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Adım 2 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-brand-600" />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Teklifler Alın ve Karşılaştırın
                  </h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Yakındaki esnaflardan teklifler alın, fiyatları karşılaştırın,
                  yorumları okuyun ve en uygun olanı seçin.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h4 className="font-semibold text-slate-900 mb-4">
                    Teklif Alma Süreci
                  </h4>
                  <ol className="space-y-3 text-slate-700 list-decimal list-inside">
                    <li>
                      <strong>Arama sonuçlarını inceleyin:</strong> Size en yakın
                      esnafları, puanlarını ve yorumlarını görün
                    </li>
                    <li>
                      <strong>Esnaf profillerini kontrol edin:</strong> Deneyim,
                      sertifikalar, önceki iş örnekleri
                    </li>
                    <li>
                      <strong>Teklif isteyin:</strong> "Teklif Al" butonuna
                      tıklayarak detaylı teklif isteyin
                    </li>
                    <li>
                      <strong>Birden fazla teklif alın:</strong> En az 3-5 esnaftan
                      teklif alarak karşılaştırma yapın
                    </li>
                  </ol>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg border border-slate-200">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Karşılaştırma Kriteri
                        </th>
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Ne Bakmalı?
                        </th>
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Önem Derecesi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>Puan ve Yorumlar</span>
                          </div>
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          4.5+ puan, 50+ yorum, son yorumların tarihi
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            Çok Önemli
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          <CreditCard className="w-4 h-4 inline mr-2" />
                          Fiyat
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Teklif fiyatı, ödeme koşulları, ek ücretler
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                            Önemli
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Yanıt Süresi
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Ortalama teklif yanıt süresi, iş başlangıç tarihi
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                            Önemli
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          <Shield className="w-4 h-4 inline mr-2" />
                          Güvenlik ve Garanti
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Hizmetgo Garantisi, sigorta, sertifikalar
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            Çok Önemli
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Konum
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Size yakınlık, ulaşım kolaylığı
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            Orta
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Adım 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-600" />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    İşinizi Halledin
                  </h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Seçtiğiniz esnafla iletişime geçin, işinizi hallettirin ve
                  memnun kalırsanız değerlendirme yapın.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h4 className="font-semibold text-slate-900 mb-4">
                    İş Süreci ve Ödeme
                  </h4>
                  <ol className="space-y-3 text-slate-700 list-decimal list-inside">
                    <li>
                      <strong>Esnaf seçimi:</strong> En uygun teklifi veren
                      esnafı seçin
                    </li>
                    <li>
                      <strong>İletişim:</strong> WhatsApp, telefon veya mesaj
                      yoluyla iletişime geçin
                    </li>
                    <li>
                      <strong>İş detayları:</strong> Tarih, saat, adres ve iş
                      detaylarını netleştirin
                    </li>
                    <li>
                      <strong>Ödeme:</strong> İş tamamlandıktan sonra ödeme
                      yapın (ön ödeme yapmayın)
                    </li>
                    <li>
                      <strong>Değerlendirme:</strong> İş bittikten sonra
                      değerlendirme yapın
                    </li>
                  </ol>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg border border-slate-200">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Ödeme Yöntemi
                        </th>
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Açıklama
                        </th>
                        <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">
                          Güvenlik
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700 font-medium">
                          Hizmetgo Güvenli Ödeme
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          Platform üzerinden güvenli ödeme, iş tamamlanana kadar
                          para korunur
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <Shield className="w-4 h-4" />
                            Güvenli
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-200 px-4 py-3 text-slate-700 font-medium">
                          Nakit Ödeme
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          İş tamamlandıktan sonra nakit ödeme
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                            Dikkatli
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 px-4 py-3 text-slate-200 font-medium">
                          Havale/EFT
                        </td>
                        <td className="border border-slate-200 px-4 py-3 text-slate-700">
                          İş tamamlandıktan sonra banka havalesi
                        </td>
                        <td className="border border-slate-200 px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                            Dikkatli
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sık Sorulan Sorular */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Hizmetgo ücretsiz mi?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Evet, Hizmetgo tamamen ücretsizdir. Hizmet arama, teklif alma ve
                esnaf bulma işlemleri için hiçbir ücret ödemezsiniz. Sadece
                seçtiğiniz esnafa iş karşılığında ödeme yaparsınız.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Kayıt olmadan kullanabilir miyim?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Arama yapmak ve esnafları görmek için kayıt olmanıza gerek yok.
                Ancak teklif almak, esnafla iletişime geçmek ve değerlendirme
                yapmak için ücretsiz hesap oluşturmanız gerekir.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Hizmetgo Garantisi nedir?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Hizmetgo Garantisi, işiniz beklendiği gibi gitmezse veya esnaf
                işi tamamlamazsa size yardımcı olur. Sorun yaşarsanız destek
                ekibimize ulaşın, çözüm bulalım.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Nasıl güvenli ödeme yapabilirim?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Hizmetgo Güvenli Ödeme sistemi ile ödeme yaparsanız, paranız iş
                tamamlanana kadar korunur. İş beklendiği gibi gitmezse ödeme
                iade edilir.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Hizmetgo ile evinizdeki her ihtiyacı kolayca çözün. Ücretsiz kayıt
            olun ve ilk hizmetinizi alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Hizmet Ara
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Ücretsiz Kayıt Ol
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

