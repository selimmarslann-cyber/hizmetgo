"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Camera, LinkIcon, Lock, LogOut, MapPin, Save, Store, User, X, Zap } from "lucide-react";
import { getSectors, getSkillsBySector } from "@/lib/data/skills";
import { useHizmetgoStore } from "@/lib/store/useHizmetgoStore";
import { useToast } from "@/lib/hooks/useToast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";
import type { SkillKeyword } from "@/lib/types/mahallem";


// Static generation'ı engelle
export default function AccountProfilePageClient() {
  const router = useRouter();
  const { currentUser, updateUserSkills, setCurrentUser } = useHizmetgoStore();
  const { success, error } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Skills state
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<SkillKeyword[]>([]);
  const [availableSkills, setAvailableSkills] = useState<SkillKeyword[]>([]);
  const [instantJobNotifications, setInstantJobNotifications] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const sectors = getSectors();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    bio: "",
    avatarUrl: "",
  });

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        router.push(
          `/auth/required?page=Profil&redirect=${encodeURIComponent("/account/profile")}`,
        );
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        city: data.user.city || "",
        district: data.user.district || "",
        address: data.user.address || "",
        bio: data.user.bio || "",
        avatarUrl: data.user.avatarUrl || "",
      });

      if (data.user.skills) {
        setSelectedSkills(data.user.skills);
      }

      setInstantJobNotifications(data.user.instantJobNotifications || false);

      // Load referral link
      if (data.user.id) {
        const referralRes = await fetch("/api/referral/overview", {
          credentials: "include",
        });
        if (referralRes.ok) {
          const referralData = await referralRes.json();
          setReferralLink(
            referralData.referralLink ||
              `https://mahallem.com/ref/${data.user.id}`,
          );
        }
      }
    } catch (err) {
      console.error("Kullanıcı verisi yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleSectorChange = (sectorId: string) => {
    setSelectedSector(sectorId);
    const skills = getSkillsBySector(sectorId);
    setAvailableSkills(skills);
  };

  const handleSkillToggle = (skill: SkillKeyword) => {
    setSelectedSkills((prev) => {
      const exists = prev.find((s) => s.id === skill.id);
      if (exists) {
        return prev.filter((s) => s.id !== skill.id);
      } else {
        return [...prev, skill];
      }
    });
  };

  const handleSaveSkills = async () => {
    if (!user?.id) return;

    setSaving(true);
    try {
      updateUserSkills(user.id, selectedSkills);

      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: selectedSkills }),
        credentials: "include",
      });

      if (res.ok) {
        success("Yetenekler kaydedildi!");
      }
    } catch (err) {
      error("Yetenekler kaydedilemedi");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.ok) {
        setSaveSuccess(true);
        success("Profil güncellendi!");
        setTimeout(() => setSaveSuccess(false), 3000);
        loadUser();
      } else {
        const data = await res.json();
        error(data.error || "Kaydetme başarısız");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
    } catch (err) {
      error("Çıkış yapılamadı");
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    success("Referans linki kopyalandı!");
  };

  const isVendor = currentUser?.role === "vendor" || user?.role === "vendor";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <AnimatedLoadingLogo />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-24 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Profilim</h1>
          <p className="text-slate-600">
            Kişisel bilgilerinizi yönetin ve ayarlarınızı güncelleyin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Header Card */}
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={formData.avatarUrl} />
                    <AvatarFallback className="bg-[#FF6000] text-white text-2xl">
                      {formData.name?.charAt(0)?.toUpperCase() || (
                        <User className="w-12 h-12" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#FF6000] text-white flex items-center justify-center hover:bg-[#FF5500] transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    {formData.name || "Kullanıcı"}
                  </h2>
                  <p className="text-slate-600 mb-2">{formData.email}</p>
                  {formData.city && (
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {formData.city}
                        {formData.district && `, ${formData.district}`}
                      </span>
                    </div>
                  )}
                  {isVendor && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => router.push(`/business/${user?.id}`)}
                    >
                      <Store className="w-4 h-4 mr-2" />
                      Mağazayı Görüntüle
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
              <CardDescription>
                Ad, e-posta ve telefon bilgileriniz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
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
                    className="h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+90 5XX XXX XX XX"
                  className="h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>Adres Bilgileri</CardTitle>
              <CardDescription>İl, ilçe ve adres bilgileriniz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">İl</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    placeholder="İstanbul"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">İlçe</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        district: e.target.value,
                      }))
                    }
                    placeholder="Kadıköy"
                    className="h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Mahalle, sokak, bina no, daire no"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bio Section */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>Kendimi Tanıt</CardTitle>
              <CardDescription>
                Kendinizi kısaca tanıtın. Hangi işlerde destek almak
                istiyorsunuz?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Ben kimim, ne iş yapıyorum, hangi işlerde destek almak istiyorum..."
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                {formData.bio.length} karakter
              </p>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>Yetenek ve Uzmanlık Alanları</CardTitle>
              <CardDescription>
                Hangi sektörde çalışıyorsunuz? Bu alanda hangi işlere
                bakarsınız?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Sektör Seçin</Label>
                <Select
                  value={selectedSector}
                  onValueChange={handleSectorChange}
                >
                  <SelectTrigger id="sector" className="h-12">
                    <SelectValue placeholder="Sektör seçin (örn: Elektrik, Tesisat, Temizlik)" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSector && availableSkills.length > 0 && (
                <div className="space-y-2">
                  <Label>Yeteneklerinizi Seçin</Label>
                  <div className="flex flex-wrap gap-2 p-4 border-2 border-slate-200 rounded-xl min-h-[100px] max-h-[200px] overflow-y-auto bg-slate-50">
                    {availableSkills.map((skill) => {
                      const isSelected = selectedSkills.some(
                        (s) => s.id === skill.id,
                      );
                      return (
                        <Badge
                          key={skill.id}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#FF6000] text-white border-[#FF6000]"
                              : ""
                          }`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill.label}
                          {isSelected && <X className="w-3 h-3 ml-1" />}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedSkills.length > 0 && (
                <div className="space-y-2">
                  <Label>Seçilen Yetenekler ({selectedSkills.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill.id} className="bg-[#FF6000] text-white">
                        {skill.label}
                        <button
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className="ml-1 hover:bg-[#FF5500] rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                onClick={handleSaveSkills}
                disabled={saving || selectedSkills.length === 0}
                variant="outline"
              >
                {saving ? "Kaydediliyor..." : "Yetenekleri Kaydet"}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Bildirim Ayarları
              </CardTitle>
              <CardDescription>
                Anlık işlerden bildirim almak istiyor musunuz?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label
                        htmlFor="instantJobNotifications"
                        className="text-base font-semibold text-slate-900 cursor-pointer"
                      >
                        Anlık İşlerden Bildirim Al
                      </Label>
                      <Switch
                        id="instantJobNotifications"
                        checked={instantJobNotifications}
                        onCheckedChange={async (checked) => {
                          setInstantJobNotifications(checked);
                          try {
                            const res = await fetch("/api/user/settings", {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                instantJobNotifications: checked,
                              }),
                              credentials: "include",
                            });
                            if (!res.ok) {
                              setInstantJobNotifications(!checked);
                              error("Ayarlar kaydedilemedi");
                            } else {
                              success("Ayarlar güncellendi!");
                            }
                          } catch (err) {
                            setInstantJobNotifications(!checked);
                            error("Bir hata oluştu");
                          }
                        }}
                      />
                    </div>
                    <p className="text-sm text-slate-600">
                      50 km çevredeki anlık işlerden bildirim al.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Link */}
          {referralLink && (
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Referans Linki
                </CardTitle>
                <CardDescription>
                  Arkadaşlarını davet et, her kayıtta kazan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="flex-1 font-mono text-sm"
                  />
                  <Button
                    type="button"
                    onClick={copyReferralLink}
                    variant="outline"
                  >
                    Kopyala
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <div className="flex items-center gap-2">
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-green-600"
                >
                  <span className="text-sm font-medium">Kaydedildi!</span>
                </motion.div>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/account/privacy")}
              >
                <Lock className="w-4 h-4 mr-2" />
                Gizlilik
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış Yap
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  "Kaydediliyor..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Kaydet
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
