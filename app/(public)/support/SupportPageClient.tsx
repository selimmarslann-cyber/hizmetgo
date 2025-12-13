"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Wrench,
  CreditCard,
  User,
  HelpCircle,
  MessageSquare,
  Search,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  FileText,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const supportCategories = [
  {
    id: "siparis",
    title: "Sipariş Sorunu",
    icon: ShoppingBag,
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
    description: "Sipariş takibi, iptal ve iade işlemleri",
    href: "/support/help?category=siparis",
  },
  {
    id: "hizmet",
    title: "Hizmet Sorunu",
    icon: Wrench,
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
    description: "Hizmet kalitesi, gecikme ve fiyat sorunları",
    href: "/support/help?category=hizmet",
  },
  {
    id: "hesap",
    title: "Hesap Sorunu",
    icon: User,
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
    description: "Giriş, şifre ve hesap yönetimi",
    href: "/support/help?category=hesap",
  },
  {
    id: "odeme",
    title: "Ödeme Sorunu",
    icon: CreditCard,
    color: "bg-orange-50 hover:bg-orange-100",
    iconColor: "text-orange-600",
    description: "Ödeme, iade ve fatura işlemleri",
    href: "/support/help?category=odeme",
  },
];

const popularSearches = [
  "Siparişimi nasıl iptal ederim?",
  "İade nasıl yapılır?",
  "Şifremi unuttum",
  "Ödeme sorunu",
  "Hesabımı nasıl silerim?",
  "Sipariş takibi",
];

const quickLinks = [
  {
    title: "Sık Sorulan Sorular",
    description: "En çok sorulan sorular ve cevapları",
    icon: HelpCircle,
    href: "/support/faq",
    color: "bg-brand-50 hover:bg-brand-100",
    iconColor: "text-brand-600",
  },
  {
    title: "Canlı Destek",
    description: "7/24 otomatik destek botu",
    icon: MessageSquare,
    href: "/support/chat",
    color: "bg-emerald-50 hover:bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "İletişim",
    description: "Bizimle iletişime geçin",
    icon: Phone,
    href: "/support/contact",
    color: "bg-indigo-50 hover:bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export default function SupportPageClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [MotionComponents, setMotionComponents] = useState<{
    MotionDiv: any;
    MotionSpan?: any;
    MotionButton?: any;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    import("framer-motion").then((mod) => {
      setMotionComponents({
        MotionDiv: mod.motion.div,
        MotionSpan: mod.motion.span,
        MotionButton: mod.motion.button,
      });
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/support/faq?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!mounted || !MotionComponents) {
    return null;
  }

  const { MotionDiv } = MotionComponents;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Size Nasıl Yardımcı Olabiliriz?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Sorularınızın cevaplarını bulun veya destek ekibimizle iletişime geçin
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Sorunuzu arayın... (örn: sipariş iptal, iade, şifre)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-brand-500 rounded-xl"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-500 hover:bg-brand-600"
                size="sm"
              >
                Ara
              </Button>
            </div>
          </form>
        </MotionDiv>

        {/* Stats Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="border-2 border-brand-100 bg-gradient-to-br from-brand-50 to-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-8 h-8 text-brand-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">24 Saat</div>
              <div className="text-sm text-gray-600">İçinde Yanıt</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
              <div className="text-sm text-gray-600">Çözülen Sorun</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">%98</div>
              <div className="text-sm text-gray-600">Memnuniyet Oranı</div>
            </CardContent>
          </Card>
        </MotionDiv>

        {/* Category Cards */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hangi konuda yardıma ihtiyacınız var?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <MotionDiv
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={category.href}>
                    <Card className={`h-full cursor-pointer transition-all border-2 hover:border-brand-300 ${category.color}`}>
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4`}>
                          <Icon className={`w-6 h-6 ${category.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                        <div className="flex items-center text-brand-600 text-sm font-medium">
                          Detaylar
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </MotionDiv>
              );
            })}
          </div>
        </MotionDiv>

        {/* Popular Searches */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">En Çok Arananlar</h2>
          <div className="flex flex-wrap gap-3">
            {popularSearches.map((search, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => router.push(`/support/faq?search=${encodeURIComponent(search)}`)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {search}
                </Button>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Quick Links */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı Erişim</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <MotionDiv
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Link href={link.href}>
                    <Card className={`h-full cursor-pointer transition-all border-2 hover:border-brand-300 ${link.color}`}>
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-4`}>
                          <Icon className={`w-6 h-6 ${link.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{link.description}</p>
                        <div className="flex items-center text-brand-600 text-sm font-medium">
                          Git
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </MotionDiv>
              );
            })}
          </div>
        </MotionDiv>

        {/* Contact Info */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Hala yardıma mı ihtiyacınız var?</h2>
                <p className="text-gray-600">Destek ekibimizle iletişime geçin</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Telefon</p>
                    <a href="tel:+905551234567" className="text-sm text-gray-600 hover:text-brand-600">
                      +90 (555) 123 45 67
                    </a>
                    <p className="text-xs text-gray-500 mt-1">Pazartesi - Cuma: 09:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">E-posta</p>
                    <a href="mailto:destek@hizmetgo.app" className="text-sm text-gray-600 hover:text-brand-600">
                      destek@hizmetgo.app
                    </a>
                    <p className="text-xs text-gray-500 mt-1">24 saat içinde yanıt</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Canlı Destek</p>
                    <Link href="/support/chat" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                      Hemen Başlat
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">7/24 otomatik destek</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </div>
  );
}

