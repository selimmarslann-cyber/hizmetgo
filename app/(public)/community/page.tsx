import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Star,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Topluluk | Hizmetgo - Esnaflar ve Müşteriler İçin Topluluk",
  description:
    "Hizmetgo topluluğuna katılın. Deneyimlerinizi paylaşın, sorularınızı sorun, ipuçları alın ve diğer esnaflar ve müşterilerle bağlantı kurun.",
  keywords: [
    "hizmetgo topluluk",
    "esnaf forumu",
    "müşteri topluluğu",
    "deneyim paylaşımı",
    "iş ipuçları",
  ],
};

export default function CommunityPage() {
  const categories = [
    {
      title: "Yeni Başlayanlar",
      description:
        "Hizmetgo'ya yeni katılan esnaflar ve müşteriler için temel bilgiler, kayıt süreci ve ilk adımlar.",
      icon: BookOpen,
      topics: 45,
      posts: 320,
    },
    {
      title: "İş Geliştirme",
      description:
        "İşinizi büyütmek, daha fazla müşteri bulmak ve gelirinizi artırmak için ipuçları ve stratejiler.",
      icon: TrendingUp,
      topics: 128,
      posts: 890,
    },
    {
      title: "Müşteri Deneyimleri",
      description:
        "Müşterilerin Hizmetgo kullanım deneyimleri, başarı hikayeleri ve öneriler.",
      icon: Heart,
      topics: 67,
      posts: 450,
    },
    {
      title: "Teknik Destek",
      description:
        "Platform kullanımı, teknik sorunlar ve çözümler hakkında sorular ve yanıtlar.",
      icon: HelpCircle,
      topics: 89,
      posts: 520,
    },
    {
      title: "İş İpuçları",
      description:
        "Hizmet kalitesini artırma, müşteri memnuniyeti ve iş yönetimi konularında ipuçları.",
      icon: Lightbulb,
      topics: 156,
      posts: 1100,
    },
    {
      title: "Etkinlikler ve Duyurular",
      description:
        "Topluluk etkinlikleri, webinarlar, eğitimler ve platform güncellemeleri.",
      icon: Calendar,
      topics: 23,
      posts: 180,
    },
  ];

  const featuredTopics = [
    {
      title: "İlk 100 Müşteriyi Nasıl Kazandım?",
      author: "Mehmet Y.",
      category: "İş Geliştirme",
      replies: 24,
      views: 450,
      lastActivity: "2 saat önce",
    },
    {
      title: "Müşteri Yorumları Geliri Nasıl Etkiliyor?",
      author: "Ayşe K.",
      category: "İş İpuçları",
      replies: 18,
      views: 320,
      lastActivity: "5 saat önce",
    },
    {
      title: "Hizmetgo ile Aylık Gelirimi 3 Katına Çıkardım",
      author: "Ali D.",
      category: "Müşteri Deneyimleri",
      replies: 31,
      views: 680,
      lastActivity: "1 gün önce",
    },
    {
      title: "Profil Fotoğrafı ve Açıklama Nasıl Olmalı?",
      author: "Fatma S.",
      category: "Yeni Başlayanlar",
      replies: 15,
      views: 280,
      lastActivity: "2 gün önce",
    },
  ];

  const recentPosts = [
    {
      title: "Teklif Gönderirken Nelere Dikkat Etmeliyim?",
      author: "Yeni Esnaf",
      category: "Yeni Başlayanlar",
      replies: 8,
      time: "3 saat önce",
    },
    {
      title: "Müşteri İletişiminde En İyi Uygulamalar",
      author: "Deneyimli Esnaf",
      category: "İş İpuçları",
      replies: 12,
      time: "6 saat önce",
    },
    {
      title: "Fiyatlandırma Stratejileri",
      author: "İş Danışmanı",
      category: "İş Geliştirme",
      replies: 20,
      time: "1 gün önce",
    },
    {
      title: "Mobil Uygulamayı Nasıl Kullanırım?",
      author: "Yeni Kullanıcı",
      category: "Teknik Destek",
      replies: 5,
      time: "1 gün önce",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 mb-6">
              <Users className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Hizmetgo Topluluğu
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Esnaflar ve müşterilerin bir araya geldiği, deneyimlerin paylaşıldığı
              ve birbirine yardım edildiği aktif bir topluluk. Siz de katılın!
            </p>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Topluluk Hakkında */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-brand-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Neden Topluluğa Katılmalısınız?
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Hizmetgo topluluğu, esnafların ve müşterilerin bir araya geldiği,
                  deneyimlerin paylaşıldığı ve birbirine yardım edildiği aktif bir
                  platformdur. İşinizi büyütmek, yeni ipuçları öğrenmek ve diğer
                  kullanıcılarla bağlantı kurmak için topluluğumuza katılın.
                </p>
                <ul className="space-y-3">
                  {[
                    "Deneyimli esnaflardan pratik ipuçları öğrenin",
                    "Müşteri deneyimlerini okuyun ve öğrenin",
                    "Sorularınızı sorun, uzmanlardan yanıt alın",
                    "Başarı hikayelerinden ilham alın",
                    "Platform güncellemelerinden haberdar olun",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                  <div className="text-4xl font-bold text-brand-600 mb-2">
                    5.000+
                  </div>
                  <div className="text-slate-600">Aktif Üye</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                  <div className="text-4xl font-bold text-brand-600 mb-2">
                    500+
                  </div>
                  <div className="text-slate-600">Aktif Konu</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                  <div className="text-4xl font-bold text-brand-600 mb-2">
                    3.000+
                  </div>
                  <div className="text-slate-600">Yanıt</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                  <div className="text-4xl font-bold text-brand-600 mb-2">
                    24/7
                  </div>
                  <div className="text-slate-600">Aktif Topluluk</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kategoriler */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Topluluk Kategorileri
            </h2>
            <Link
              href="/community/new-topic"
              className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
            >
              Yeni Konu Aç
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  href={`/community/category/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block group"
                >
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-300 transition-all h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center group-hover:bg-brand-200 transition-colors flex-shrink-0">
                        <Icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {category.topics} konu
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {category.posts} yanıt
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Öne Çıkan Konular */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Öne Çıkan Konular
            </h2>
            <Link
              href="/community/topics"
              className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1"
            >
              Tümünü Gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredTopics.map((topic, index) => (
              <Link
                key={index}
                href={`/community/topic/${index + 1}`}
                className="block group"
              >
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold mb-3">
                        <Tag className="w-3 h-3" />
                        {topic.category}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{topic.author}</span>
                        <span>•</span>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {topic.replies} yanıt
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {topic.views} görüntüleme
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Son Gönderiler */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Son Gönderiler
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="divide-y divide-slate-200">
              {recentPosts.map((post, index) => (
                <Link
                  key={index}
                  href={`/community/post/${index + 1}`}
                  className="block p-6 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-sm text-slate-500">
                          {post.author}
                        </span>
                        <span className="text-sm text-slate-400">•</span>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.replies} yanıt
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Topluluk Kuralları */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-brand-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Topluluk Kuralları
              </h2>
            </div>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Hizmetgo topluluğu, saygılı, yardımsever ve yapıcı bir ortam
              sağlamak için bazı kurallara sahiptir. Lütfen bu kurallara uyun:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Saygılı ve kibar bir dil kullanın",
                "Spam ve reklam yapmayın",
                "Kişisel bilgileri paylaşmayın",
                "Telif haklarına saygı gösterin",
                "Yapıcı eleştiriler yapın",
                "Yardımsever olun ve bilgi paylaşın",
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Topluluğa Katılın
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Hizmetgo topluluğuna katılın, deneyimlerinizi paylaşın ve diğer
            kullanıcılardan öğrenin. Birlikte büyüyoruz!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-lg"
            >
              Ücretsiz Kayıt Ol
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/community/new-topic"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-lg"
            >
              İlk Konunuzu Açın
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

