"use client";

import Image from "next/image";
import { QrCode, Search, Star } from "lucide-react";

export default function AppDownloadFinal() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Yeşillikli Arka Plan Resmi - Blur efekti ile */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Yeşillikli doğa arka planı"
          fill
          className="object-cover scale-110"
          style={{ filter: "blur(40px)" }}
          priority
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-green-800/30 to-emerald-900/40" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Sol taraf: metin ve butonlar */}
          <div className="space-y-6 text-white">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
                Tek uygulama ile
                <br />
                her şeyi hallet
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Özel rehberlerden sorunsuz proje planlamaya kadar her şey burada
                — tek bir ücretsiz uygulamada.
              </p>
            </div>

            {/* App Store ve Google Play Butonları + QR Kod */}
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* QR Kod */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 rounded-xl bg-white p-3 flex items-center justify-center shadow-xl">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <p className="text-xs text-white/80 text-center max-w-[100px]">
                  QR kodu okutarak indir
                </p>
              </div>

              {/* App Store Butonları */}
              <div className="flex flex-col gap-3">
                {/* App Store Badge */}
                <a
                  href="https://apps.apple.com/app/hizmetgo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-black/80 hover:bg-black/90 backdrop-blur-sm text-white px-5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg border border-white/10"
                >
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] text-white/70 leading-tight uppercase tracking-wide">
                      Download on the
                    </p>
                    <p className="text-base font-bold leading-tight">
                      App Store
                    </p>
                  </div>
                </a>

                {/* Google Play Badge */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.hizmetgo.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-black/80 hover:bg-black/90 backdrop-blur-sm text-white px-5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg border border-white/10"
                >
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] text-white/70 leading-tight uppercase tracking-wide">
                      GET IT ON
                    </p>
                    <p className="text-base font-bold leading-tight">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Sağ taraf: mobil uygulama mockup - Profesyonel */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[240px]">
              {/* Mobil telefon mockup */}
              <div className="relative">
                {/* Telefon gölgesi */}
                <div className="absolute inset-0 bg-black/20 rounded-[3rem] blur-xl scale-110" />
                
                {/* Telefon çerçevesi */}
                <div className="relative rounded-[2.5rem] bg-slate-900 p-1.5 shadow-2xl">
                  {/* Ekran */}
                  <div className="aspect-[9/19.5] rounded-[2rem] bg-white overflow-hidden border-2 border-slate-800">
                    {/* Status bar */}
                    <div className="h-10 bg-white flex items-center justify-between px-4 pt-1">
                      <span className="text-[10px] font-semibold text-slate-900">9:41</span>
                      <div className="flex items-center gap-0.5">
                        <div className="w-3 h-1.5 border border-slate-900 rounded-sm">
                          <div className="w-2.5 h-1 bg-slate-900 rounded-sm m-0.5" />
                        </div>
                        <div className="w-0.5 h-0.5 bg-slate-900 rounded-full" />
                      </div>
                    </div>
                    
                    {/* App içeriği - 5 Yıldızlı Ustalar Listesi */}
                    <div className="px-3 py-3 space-y-2 bg-white overflow-y-auto h-full">
                      {/* Arama çubuğu */}
                      <div className="bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 flex items-center gap-2 mb-3 sticky top-0 z-10">
                        <Search className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] text-slate-400">Hizmet ara...</span>
                      </div>
                      
                      {/* Usta kartları - 5 yıldızlı */}
                      <div className="space-y-2.5">
                        {[
                          {
                            name: "Mehmet Yılmaz",
                            rating: 5.0,
                            reviews: 245,
                            price: "1.500 ₺",
                            avatar: "https://images.pexels.com/photos/34967833/pexels-photo-34967833.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
                            service: "Elektrik Tamiri",
                          },
                          {
                            name: "Ali Demir",
                            rating: 5.0,
                            reviews: 189,
                            price: "2.000 ₺",
                            avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
                            service: "Temizlik Hizmeti",
                          },
                          {
                            name: "Hasan Kaya",
                            rating: 5.0,
                            reviews: 312,
                            price: "1.800 ₺",
                            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
                            service: "Boya Badana",
                          },
                          {
                            name: "Fatih Öz",
                            rating: 5.0,
                            reviews: 156,
                            price: "2.200 ₺",
                            avatar: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
                            service: "Tesisat",
                          },
                        ].map((pro, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-2.5">
                              {/* Avatar */}
                              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-200">
                                <Image
                                  src={pro.avatar}
                                  alt={pro.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                  unoptimized
                                />
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold text-slate-900 leading-tight truncate">
                                      {pro.name}
                                    </p>
                                    <p className="text-[8px] text-slate-500 mt-0.5">
                                      {pro.service}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-[10px] font-bold text-brand-600 leading-tight">
                                      {pro.price}
                                    </p>
                                  </div>
                                </div>
                                
                                {/* Rating */}
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[8px] font-semibold text-slate-700">
                                    {pro.rating}
                                  </span>
                                  <span className="text-[8px] text-slate-400">•</span>
                                  <span className="text-[8px] text-slate-500">
                                    {pro.reviews} yorum
                                  </span>
                                </div>
                                
                                {/* Button */}
                                <button className="w-full bg-brand-500 hover:bg-brand-600 text-white text-[9px] font-semibold py-1.5 rounded-lg transition-colors">
                                  Teklif Seç
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Home indicator (iPhone) */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

