"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">İletişim</h1>
          <p className="text-gray-600">
            Sorularınız, önerileriniz veya şikayetleriniz için bizimle iletişime
            geçebilirsiniz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* İletişim Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FF6000] mt-1" />
                <div>
                  <p className="font-semibold text-sm">E-posta</p>
                  <a
                    href="mailto:destek@hizmetgo.app"
                    className="text-sm text-gray-600 hover:text-[#FF6000]"
                  >
                    destek@hizmetgo.app
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FF6000] mt-1" />
                <div>
                  <p className="font-semibold text-sm">Telefon</p>
                  <a
                    href="tel:+905551234567"
                    className="text-sm text-gray-600 hover:text-[#FF6000]"
                  >
                    +90 (555) 123 45 67
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF6000] mt-1" />
                <div>
                  <p className="font-semibold text-sm">Adres</p>
                  <p className="text-sm text-gray-600">Türkiye</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canlı Destek */}
          <Card className="border-2 border-[#FF6000]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FF6000]" />
                Canlı Destek
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Hızlı çözüm için destek botumuz ile 7/24 canlı konuşabilirsiniz.
                Bot sorununuzu çözemezse otomatik olarak destek ekibimize
                yönlendirilirsiniz.
              </p>
              <Link href="/support/chat">
                <Button className="w-full bg-[#FF6000] hover:bg-[#FF7000]">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Destek Botu ile Konuş
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

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
