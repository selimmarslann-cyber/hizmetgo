"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl">Çerez Politikası</CardTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Son güncelleme:{" "}
              {new Date().toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  1. Çerez Nedir?
                </h2>
                <p className="text-sm leading-relaxed">
                  Çerezler, web sitelerini ziyaret ettiğinizde cihazınıza
                  (bilgisayar, tablet, akıllı telefon) kaydedilen küçük metin
                  dosyalarıdır. Çerezler, web sitesinin düzgün çalışmasına
                  yardımcı olur ve kullanıcı deneyimini iyileştirir.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  2. Çerez Türleri
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Zorunlu Çerezler
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Bu çerezler, web sitesinin temel işlevlerinin çalışması
                      için gereklidir. Site güvenliği, oturum yönetimi ve temel
                      özellikler için kullanılır.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Performans Çerezleri
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Bu çerezler, web sitesinin performansını analiz etmek ve
                      kullanıcı deneyimini iyileştirmek için kullanılır. Anonim
                      veriler toplanır.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      İşlevsellik Çerezleri
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Bu çerezler, tercihlerinizi hatırlamak ve
                      kişiselleştirilmiş bir deneyim sunmak için kullanılır
                      (örneğin, dil tercihi, bölge ayarları).
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  3. Kullandığımız Çerezler
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">
                      Oturum Yönetimi
                    </p>
                    <p className="text-gray-600">
                      Giriş yaptığınızda oturumunuzu yönetmek için kullanılır.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Güvenlik</p>
                    <p className="text-gray-600">
                      Güvenlik ve dolandırıcılık önleme için kullanılır.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Tercihler</p>
                    <p className="text-gray-600">
                      Kullanıcı tercihlerinizi hatırlamak için kullanılır.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  4. Çerezleri Yönetme
                </h2>
                <p className="text-sm leading-relaxed mb-2">
                  Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz. Ancak,
                  bazı çerezler devre dışı bırakıldığında web sitesinin bazı
                  özellikleri düzgün çalışmayabilir.
                </p>
                <p className="text-sm leading-relaxed">
                  Çoğu tarayıcıda çerez ayarlarına şu yollardan ulaşabilirsiniz:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed mt-2">
                  <li>Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                  <li>Firefox: Seçenekler → Gizlilik ve Güvenlik → Çerezler</li>
                  <li>Safari: Tercihler → Gizlilik → Çerezler</li>
                  <li>
                    Edge: Ayarlar → Gizlilik, arama ve hizmetler → Çerezler
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  5. Üçüncü Taraf Çerezler
                </h2>
                <p className="text-sm leading-relaxed">
                  Platform&apos;da, hizmet kalitesini iyileştirmek için üçüncü
                  taraf hizmetler kullanılabilir. Bu hizmetler kendi çerez
                  politikalarına sahiptir.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  6. Değişiklikler
                </h2>
                <p className="text-sm leading-relaxed">
                  Bu çerez politikası zaman zaman güncellenebilir. Önemli
                  değişiklikler kullanıcılara bildirilir. Güncel politika her
                  zaman bu sayfada yayınlanır.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  7. İletişim
                </h2>
                <p className="text-sm leading-relaxed">
                  Çerezler hakkında sorularınız için bizimle iletişime
                  geçebilirsiniz:
                  <br />
                  E-posta: destek@hizmetgo.app
                  <br />
                  Telefon: +90 (555) 123 45 67
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
