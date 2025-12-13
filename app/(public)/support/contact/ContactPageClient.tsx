"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, MessageSquare, Phone, Clock, CheckCircle2, Twitter, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/lib/hooks/useToast";


// Static generation'ı engelle
export default function ContactPageClient() {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/support/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.ok) {
        success(
          "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          category: "",
          message: "",
        });
      } else {
        error("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">İletişim</h1>
          <p className="text-gray-600">
            Sorularınız, önerileriniz veya şikayetleriniz için bizimle iletişime
            geçebilirsiniz.
          </p>
        </div>

        {/* Response Time Info */}
        <Card className="mb-8 bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-brand-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Yanıt Süreleri</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span><strong>E-posta:</strong> 24 saat içinde yanıt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span><strong>Canlı Destek:</strong> Anında yanıt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span><strong>Telefon:</strong> Çalışma saatleri içinde (Pazartesi - Cuma: 09:00 - 18:00)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* İletişim Bilgileri */}
          <Card className="border-2 hover:border-brand-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand-600" />
                İletişim Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">E-posta</p>
                  <a
                    href="mailto:destek@hizmetgo.app"
                    className="text-sm text-gray-600 hover:text-brand-600 transition-colors"
                  >
                    destek@hizmetgo.app
                  </a>
                  <Badge variant="outline" className="mt-1 text-xs">24 saat içinde yanıt</Badge>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">Telefon</p>
                  <a
                    href="tel:+905551234567"
                    className="text-sm text-gray-600 hover:text-brand-600 transition-colors"
                  >
                    +90 (555) 123 45 67
                  </a>
                  <Badge variant="outline" className="mt-1 text-xs">Pazartesi - Cuma: 09:00 - 18:00</Badge>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">Adres</p>
                  <p className="text-sm text-gray-600">Türkiye</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canlı Destek */}
          <Card className="border-2 border-brand-500 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                Canlı Destek
                <Badge className="ml-auto bg-emerald-500">7/24 Aktif</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Hızlı çözüm için destek botumuz ile 7/24 canlı konuşabilirsiniz.
                Bot sorununuzu çözemezse otomatik olarak destek ekibimize
                yönlendirilirsiniz.
              </p>
              <Link href="/support/chat">
                <Button className="w-full bg-brand-500 hover:bg-brand-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Destek Botu ile Konuş
                </Button>
              </Link>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Ortalama yanıt süresi: <strong className="text-brand-600">2 dakika</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sosyal Medya */}
        <Card className="mb-8 border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Sosyal Medya</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Bizi sosyal medyada takip edin, güncel haberler ve duyuruları kaçırmayın.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <a
                href="https://twitter.com/hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
              >
                <Twitter className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">Twitter</span>
              </a>
              <a
                href="https://instagram.com/hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all group"
              >
                <Instagram className="w-6 h-6 text-gray-600 group-hover:text-pink-500" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-pink-600">Instagram</span>
              </a>
              <a
                href="https://facebook.com/hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <Facebook className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">Facebook</span>
              </a>
              <a
                href="https://linkedin.com/company/hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-700 hover:bg-blue-50 transition-all group"
              >
                <Linkedin className="w-6 h-6 text-gray-600 group-hover:text-blue-700" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">LinkedIn</span>
              </a>
              <a
                href="https://youtube.com/@hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group"
              >
                <Youtube className="w-6 h-6 text-gray-600 group-hover:text-red-500" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-red-600">YouTube</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* İletişim Formu */}
        <Card>
          <CardHeader>
            <CardTitle>Bize Ulaşın</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Konu *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Konu seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Genel Bilgi</SelectItem>
                      <SelectItem value="technical">Teknik Destek</SelectItem>
                      <SelectItem value="payment">Ödeme Sorunu</SelectItem>
                      <SelectItem value="refund">İade/İptal</SelectItem>
                      <SelectItem value="account">Hesap Sorunu</SelectItem>
                      <SelectItem value="business">Esnaf Kaydı</SelectItem>
                      <SelectItem value="complaint">Şikayet</SelectItem>
                      <SelectItem value="suggestion">Öneri</SelectItem>
                      <SelectItem value="other">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Başlık *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mesaj *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Gönderiliyor..." : "Gönder"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
