import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Tag, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Hizmetgo",
  description:
    "Hizmetgo blog. Hizmet sektörü, teknoloji, iş ipuçları ve platform güncellemeleri hakkında makaleler.",
  keywords: [
    "blog",
    "makale",
    "hizmet sektörü",
    "teknoloji",
    "iş ipuçları",
    "Hizmetgo blog",
  ],
};

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Hizmetgo Platformu Lansman Edildi",
      excerpt:
        "Hizmetgo, mahalle esnafı ile müşterileri buluşturan yeni platformunu bugün lansman etti. Platform, Türkiye genelinde hizmet arayan müşteriler ile yerel esnafları bir araya getiriyor.",
      author: "Hizmetgo Ekibi",
      date: "04.12.2025",
      readTime: "3 dk",
      category: "Duyuru",
      featured: true,
    },
    {
      title: "Mahalle Esnafı İçin Dijital Dönüşüm Rehberi",
      excerpt:
        "Dijital dönüşüm, mahalle esnafı için artık bir seçenek değil, bir zorunluluk. Bu rehberde, esnafların dijital dünyada nasıl var olabileceğini ve müşterilere nasıl ulaşabileceğini anlatıyoruz.",
      author: "Hizmetgo Ekibi",
      date: "04.12.2025",
      readTime: "5 dk",
      category: "Rehber",
      featured: false,
    },
    {
      title: "Ev Tadilatı İçin En İyi Zaman Ne Zaman?",
      excerpt:
        "Ev tadilatı yapmak için en uygun zamanı seçmek, hem maliyet hem de kalite açısından önemlidir. Bu yazıda, ev tadilatı için en iyi zamanları ve dikkat edilmesi gereken noktaları ele alıyoruz.",
      author: "Hizmetgo Ekibi",
      date: "04.12.2025",
      readTime: "4 dk",
      category: "İpuçları",
      featured: false,
    },
    {
      title: "Güvenilir Esnaf Nasıl Seçilir?",
      excerpt:
        "Ev işleriniz için esnaf seçerken dikkat etmeniz gereken önemli noktalar. Yorumlar, puanlar, sertifikalar ve daha fazlası hakkında bilgi edinin.",
      author: "Hizmetgo Ekibi",
      date: "04.12.2025",
      readTime: "6 dk",
      category: "Rehber",
      featured: false,
    },
    {
      title: "Hizmetgo ile İlk 1000 Esnaf",
      excerpt:
        "Platform lansmanından kısa bir süre sonra Hizmetgo, 1000 esnaf kaydına ulaştı. Bu başarı, platformun hızlı büyümesini ve yerel esnafın ilgisini gösteriyor.",
      author: "Hizmetgo Ekibi",
      date: "04.12.2025",
      readTime: "2 dk",
      category: "Haber",
      featured: false,
    },
    {
      title: "Yerel Ekonomiyi Güçlendirmek: Hizmetgo'nun Misyonu",
      excerpt:
        "Hizmetgo olarak, yerel ekonomiyi güçlendirmek ve mahalle esnafına destek olmak misyonumuz. Bu yazıda, platformun yerel ekonomiye katkılarını ele alıyoruz.",
      author: "Hizmetgo Ekibi",
      date: "04.12.2025",
      readTime: "5 dk",
      category: "Misyon",
      featured: false,
    },
  ];

  const categories = [
    "Tümü",
    "Duyuru",
    "Rehber",
    "İpuçları",
    "Haber",
    "Misyon",
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
              Hizmetgo Blog
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hizmet sektörü, teknoloji, iş ipuçları ve platform güncellemeleri
              hakkında makaleler.
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Kategoriler */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-brand-100 hover:text-brand-700 font-medium transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Öne Çıkan Makale */}
        {blogPosts
          .filter((post) => post.featured)
          .map((post) => (
            <section key={post.title} className="mb-16">
              <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 md:p-12 border-2 border-brand-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-brand-500 text-white rounded-full text-xs font-semibold">
                      Öne Çıkan
                    </span>
                    <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {post.title}
                  </h2>
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          ))}

        {/* Diğer Makaleler */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Son Makaleler
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block group"
                >
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Abonelik */}
        <section className="mt-16">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Blog Güncellemelerini Kaçırmayın
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Yeni makalelerden haberdar olmak için e-posta listemize katılın.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-xl text-slate-900 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-white text-brand-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

